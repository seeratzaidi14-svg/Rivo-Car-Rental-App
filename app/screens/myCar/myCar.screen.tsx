import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import HeaderComponent from '../../components/header/component';
import { createStyles } from './myCar.styles';
import { supabase } from '../../services/supabaseClient';
import CarComponent from '../../components/car/component';
import { renderMarginBottom } from '../../utils/ui-utils';

const MyCarScreen = () => {
  const styles = createStyles();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCars();
  }, []);

  const fetchMyCars = async () => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('My Cars fetch error:', error);
        return;
      }

      setCars(data || []);
    } catch (err) {
      console.log('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="My Rental Cars" hasBack />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {loading ? (
            <Text style={styles.emptyText}>Loading...</Text>
          ) : cars.length === 0 ? (
            <Text style={styles.emptyText}>No cars added yet</Text>
          ) : (
            cars
              .reduce((rows: any[], car, index) => {
                if (index % 2 === 0) rows.push([]);
                rows[rows.length - 1].push(car);
                return rows;
              }, [])
              .map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((car: any) => (
                    <CarComponent
                      key={car.id}
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
                  ))}
                </View>
              ))
          )}

          {renderMarginBottom(80)}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyCarScreen;
