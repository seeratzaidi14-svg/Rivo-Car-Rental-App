import { Buffer } from 'buffer';
import { supabase } from '../services/supabaseClient';

export const uploadCarAndInsert = async (image: any, carData: any) => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    if (!image?.base64) {
      throw new Error('Image base64 missing');
    }

    const fileExt = image.fileName?.split('.').pop() || 'jpg';
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('car-images')
      .upload(
        fileName,
        Buffer.from(image.base64, 'base64'),
        {
          contentType: image.type || 'image/jpeg',
          upsert: false,
        }
      );

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from('car-images')
      .getPublicUrl(fileName);

    const publicUrl = publicData.publicUrl;

    const { error: insertError } = await supabase.from('cars').insert({
      user_id: user.id,
      car_name: carData.car_name,
      brand: carData.brand,
      seats: carData.seats,                 
      fuel_type: carData.fuel_type,         
      transmission: carData.transmission,   
      location: carData.location,
      price: carData.price,
      image_url: publicUrl,
      rating: 4.5,
      review_count: 0,
    });

    if (insertError) throw insertError;

    return true;
  } catch (error) {
    console.error('Upload/Insert Error:', error);
    throw error;
  }
};
