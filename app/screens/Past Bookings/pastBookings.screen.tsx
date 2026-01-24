import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import HeaderComponent from '../../components/header/component';
import { createStyles } from './pastBooking.styles';
import { supabase } from '../../services/supabaseClient';
import CarComponent from '../../components/car/component';
import { navigate } from '../../navigators/navigation-utilities';
import { colors } from '../../theme/colors';
import { renderMarginBottom } from '../../utils/ui-utils';

const PastBookingScreen = () => {
  const styles = createStyles();

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        setError('User not logged in');
        return;
      }

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          start_date,
          end_date,
          total_price,
          status,
          cars:car_id (
            id,
            car_name,
            brand,
            location,
            price,
            image_url,
            rating,
            review_count,
            seats,
            fuel_type,
            transmission
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
        setError('Failed to load bookings');
        return;
      }

      setBookings(data || []);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Previous Bookings" hasBack />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No previous bookings found</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.list}>
  {bookings
    .reduce((rows: any[], booking, index) => {
      if (index % 2 === 0) rows.push([]);
      rows[rows.length - 1].push(booking);
      return rows;
    }, [])
    .map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((booking: any) => {
          const car = booking.cars;
          if (!car) return null;

          return (
            <CarComponent
              key={booking.id}
              name={car.car_name}
              brand={car.brand}
              location={car.location}
              image_url={car.image_url}
              rating={car.rating ?? 4.5}
              review_count={car.review_count ?? 0}
              seats={Number(car.seats) || 4}
              fuel_type={car.fuel_type || ''}
              transmission={car.transmission || ''}
              pricePerDay={car.price}
            />
          );
        })}
      </View>
    ))}
</View>

          {renderMarginBottom(80)}
        </ScrollView>
      )}
    </View>
  );
};

export default PastBookingScreen;
