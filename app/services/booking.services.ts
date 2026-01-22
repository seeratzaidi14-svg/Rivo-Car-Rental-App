import { supabase } from './supabaseClient';

export type InsertBookingPayload = {
  userId: string;
  carId: string;
  carOwnerId: string;
  fullName: string;
  gender: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  pickupLocation: string;
};

export type InsertBookingResponse = {
  id: string;
};

export const insertBooking = async (
  payload: InsertBookingPayload
): Promise<InsertBookingResponse> => {
  const {
    userId,
    carId,
    carOwnerId,
    fullName,
    gender,
    startDate,
    endDate,
    totalPrice,
    pickupLocation,
  } = payload;

  if ( userId === carOwnerId) {
    throw new Error("You cannot book your own car");
  }

  const { data: existingBookings, error: overlapError } = await supabase
   .from('bookings')
   .select('id')
   .eq('car_id', carId)
   .in('status', ['pending', 'confirmed'])
   .lte('start_date', endDate)
   .gte('end_date', startDate);

   if (overlapError) {
    console.error('Overlap check error:', overlapError);
      throw new Error('Failed to check existing bookings.');
   }

   if (existingBookings && existingBookings.length > 0) {
    throw new Error('This car is already booked for the selected dates.');
   }

  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        user_id: userId,
        car_id: carId,
        full_name: fullName,
        gender,
        start_date: startDate,      
        end_date: endDate,          
        total_price: totalPrice,
        pickup_location: pickupLocation,
        status: 'pending',
      },
    ])
    .select('id')
    .single();

  if (error) {
    console.error('Booking insert error:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
  };
};
