import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import HeaderComponent from '../../../components/header/component';
import { HeaderAction } from '../component/header';
import { createStyles } from './chat.styles';
import InputComponent from '../../../components/input/component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';
import { scale } from '../../../theme/scale';
import ChatCard from '../../../components/chatCard/component';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../../../services/supabaseClient';

const ChatScreen = () => {
  const styles = createStyles();
  const route = useRoute<any>();
  const { conversationId, name } = route.params ?? {};

  const [userId, setUserId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUserId(data.user?.id ?? null);
  };

  const fetchMessages = async () => {
    if (!conversationId) return;
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false });
    if (!error && data) setMessages(data);
  };

  const setupRealtime = useCallback(() => {
    if (!conversationId) return;
    const channel = supabase
      .channel(`chat_${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, payload => {
        setMessages(prev => prev.find(m => m.id === payload.new.id) ? prev : [payload.new, ...prev]);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [conversationId]);


  const handleSend = async () => {
    if (!messageText.trim() || !userId || !conversationId) return;

    const msg = messageText.trim();

    const tempMessage = {
      id: Date.now().toString(),
      conversation_id: conversationId,
      sender_id: userId,
      message: msg,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [tempMessage, ...prev]);
    setMessageText('');

    await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: userId,
      message: msg,
      is_read: false,
    });

    await supabase.from('conversations').update({
      last_message: msg,
      updated_at: new Date().toISOString(),
    })
    .eq('id', conversationId);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!conversationId || !userId) return;

    fetchMessages();
    markMessagesAsRead();
    const cleanupChat = setupRealtime();

    return () => {
      cleanupChat?.();
    };
  }, [conversationId, userId]);

  const markMessagesAsRead = async () => {
    if (!userId || !conversationId) return;

    await supabase
     .from('messages')
     .update({is_read: true})
     .eq('conversation_id', conversationId)
     .neq('sender_id', userId)
     .eq('is_read', false);
  };

  return (
    <View style={styles.container}>
      <HeaderComponent hasBack actionComponent={<HeaderAction />} title={name} />
      <View style={styles.main}>
        <FlatList
          data={messages}
          inverted
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ChatCard
              message={item.message}
              time={new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              isSelf={item.sender_id === userId}
            />
          )}
        />
        <View style={styles.sendMessageContainer}>
          <InputComponent
            containerStyle={styles.sendInput}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Send a message..."
          />
          <MaterialIcons
            onPress={handleSend}
            name="send"
            color={colors.black}
            size={scale(24)}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
