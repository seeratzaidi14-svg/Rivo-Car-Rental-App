import React from 'react';
import { View } from 'react-native';
import HeaderComponent from '../../components/header/component';
import { createStyles } from './pastBooking.styles';
const PastBookingScreen = () => {
  const styles = createStyles();
  return (
    <View style={styles.container}>
      <HeaderComponent title="Past Bookings" hasBack />
    </View>
  );
};

export default PastBookingScreen;
