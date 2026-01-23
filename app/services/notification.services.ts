import { supabase } from './supabaseClient';

export const insertNotification = async ({
  userId,
  title,
  text,
  link = null,
}: {
  userId: string;
  title: string;
  text: string;
  link?: string | null;
}) => {
  const { data, error } = await supabase.from('notifications').insert([
    {
      user_id: userId,
      title,
      text,
      link,
    },
  ]);

  if (error) {
    console.error('Notification insert error:', error.message);
    throw new Error(error.message);
  }

  return data;
};
