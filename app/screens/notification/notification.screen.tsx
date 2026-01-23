import React, { useEffect, useState } from 'react';
import { SectionList, Text, View } from 'react-native';
import HeaderComponent from '../../components/header/component';
import { renderMarginBottom } from '../../utils/ui-utils';
import { createStyles } from './notification.styles';
import SingleItem from './singleItem';
import { useAuth } from '../../utils/useAuth';
import { supabase } from '../../services/supabaseClient';
import { navigate } from '../../navigators/navigation-utilities';

const NotificationScreen = () => {
  const styles = createStyles();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  const groupNotifications = (items: any[]) => {
    const today = new Date().toDateString();
    const todayGroup: any[] = [];
    const previousGroup: any[] = [];

    items.forEach(item => {
      const createdAt = new Date(item.created_at).toDateString();
      const time = new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const formattedItem = {
        id: item.id,
        title: item.title,
        text: item.text,
        time,
        unRead: item.unread,
      };

      if (createdAt === today) {
        todayGroup.push(formattedItem);
      } else {
        previousGroup.push(formattedItem);
      }
    });

    const sections = [];
    if (todayGroup.length > 0) sections.push({ title: 'Today', data: todayGroup });
    if (previousGroup.length > 0) sections.push({ title: 'Previous', data: previousGroup });
    return sections;
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch notification error:', error.message);
        return;
      }

      if (data) setNotifications(groupNotifications(data));
    };

    fetchNotifications();
    const channel = supabase
      .channel('realtime:notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        payload => {
          const newNotif = payload.new;
          const time = new Date(newNotif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const formattedItem = {
            id: newNotif.id,
            title: newNotif.title,
            text: newNotif.text,
            time,
            unRead: newNotif.unread,
          };
          setNotifications(prev => {
            const grouped = groupNotifications([formattedItem, ...prev.flatMap(s => s.data)]);
            return grouped;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return (
    <View style={styles.container}>
      <HeaderComponent title="Notification" hasBack />
      {renderMarginBottom(12)}

      <SectionList
        sections={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SingleItem
            unRead={item.unRead}
            title={item.title}
            time={item.time}
            text={item.text}
            onPress={() => {
              const conversationId = item.link?.split('/')?.[2];
              if (conversationId) {
                navigate('rootStack', {
                  screen: 'ChatScreen', params: {conversationId},
                });
              }
            }}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.Text}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default NotificationScreen;
