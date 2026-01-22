import { supabase } from './supabaseClient';

export const insertPayment = async ({
  bookingId,
  method,
  status
}: {
  bookingId: string;
  method: string;
  status: string;
}) => {
  const { data, error } = await supabase.from('payments').insert([
    {
      booking_id: bookingId,
      method,
      status,
    },
  ]);

  if (error) {
    console.error('Insert Payment Error:', error.message);
    throw new Error(error.message);
  }

  return data;
};
