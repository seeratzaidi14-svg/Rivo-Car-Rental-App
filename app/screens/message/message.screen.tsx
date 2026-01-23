import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import HeaderComponent from '../../components/header/component';
import { HeaderAction } from './component/header';
import { createStyles } from './message.styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import InputComponent from '../../components/input/component';
import { scale } from '../../theme/scale';
import { renderBorderBottom, renderMarginBottom, renderMarginTop } from '../../utils/ui-utils';
import { navigate } from '../../navigators/navigation-utilities';
import SingleItem from './component/singleItem';
import { useAuth } from '../../utils/useAuth';
import { supabase } from '../../services/supabaseClient';

const MessageScreen = () => {
  const styles = createStyles();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<any[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  const fetchConversations = async () => {
    if (!user?.id) return;

    setLoading(true);

    const { data: convs, error } = await supabase
      .from('conversations')
      .select('*')
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Conversation fetch error:', error.message);
      setLoading(false);
      return;
    }

    const otherUserIds = convs.map(c =>
      c.user1_id === user.id ? c.user2_id : c.user1_id
    );

    const { data: usersData, error: usersError } = await supabase
     .from('users')
     .select('id, full_name')
     .in('id', otherUserIds);

    if (usersError) {
      console.error('Users fetch error:', usersError.message);
      setLoading(false);
      return;
   }

    const usersMap: Record<string, string> = {};

    (usersData ?? []).forEach(u => {
      usersMap[u.id] = u.full_name;
    });


    const formatted = convs.map(c => {
      const otherId = c.user1_id === user.id ? c.user2_id : c.user1_id;

      return {
        id: c.id,
        name: usersMap[otherId] || 'User',
        lastMessage: c.last_message || '',
        time: new Date(c.updated_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        otherUserIds: otherId,
      };
    });

    setConversations(formatted);
    setLoading(false);
  };

 const fetchUnreadCounts = async () => {
  if (!user?.id) return;

  const { data, error } = await supabase
    .rpc('get_unread_message_counts', { uid: user.id });

  if (error) {
    console.error('Unread count error:', error.message);
    return;
  }

  const counts: Record<string, number> = {};
  (data || []).forEach((item: any) => {
    counts[item.conversation_id] = item.count;
  });

  setUnreadCounts(counts);
};

  useEffect(() => {
    if (!user?.id) return;
    fetchConversations();
    fetchUnreadCounts();

    const convSub = supabase
      .channel('conversations')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'conversations',
      }, fetchConversations)
      .subscribe();

    const msgSub = supabase
     .channel('messages')
     .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'messages',
     }, fetchUnreadCounts)
     .subscribe();

    return () => {
      supabase.removeChannel(convSub);
      supabase.removeChannel(msgSub);
    };
  }, [user?.id]);

  return (
    <View style={styles.container}>
      <HeaderComponent hasBack actionComponent={<HeaderAction />} title={'Messages'} />
      <View style={styles.main}>
        <InputComponent
          onChangeText={e => console.log(e)}
          leftAction={
            <MaterialIcons color={colors.bell} name="search" size={scale(22)} />
          }
          placeholder='Search...'
          containerStyle={styles.input}
        />
        {renderMarginTop(12)}
        {loading ? (
          <ActivityIndicator size='large' color={colors.black} />
        ) : (
          <FlatList
            data={conversations}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <SingleItem
                onPress={() =>
                  navigate('rootStack', {
                    screen: 'ChatScreen',
                    params: {
                      conversationId: item.id,
                      otherUserIds: item.otherUserIds,
                      name: item.name,
                    },
                  })
                }
                isHighlighted={unreadCounts[item.id] > 0}
                name={item.name}
                message={item.lastMessage}
                time={item.time}
                badge={unreadCounts[item.id] || 0}
              />
            )}
          />
        )}
        {renderBorderBottom(90)}
      </View>
    </View>
  );
};

export default MessageScreen;
