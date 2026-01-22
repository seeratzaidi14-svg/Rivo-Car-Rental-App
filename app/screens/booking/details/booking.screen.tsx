import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import HeaderComponent from '../../../components/header/component';
import StepperComponent from '../../../components/stepper/component';
import { colors } from '../../../theme/colors';
import { renderMarginBottom } from '../../../utils/ui-utils';
import InputComponent from '../../../components/input/component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../../../theme/scale';
import TabSwitcher from '../../../components/tabSwitcher/component';
import { genderData, rentalData, } from '../../search/view/filter.data';
import DateComponent from '../../../components/date/component';
import Button from '../../../components/button/component';
import { createStyles } from './booking.styles';
import { navigate } from '../../../navigators/navigation-utilities';
import { useRoute } from '@react-navigation/native';
import { insertBooking } from '../../../services/booking.services';
import { useAuth } from '../../../utils/useAuth';

const BookingScreen = () => {
  const styles = createStyles();
  const route = useRoute<any>();
  const carData = route.params?.car;
  const {user} = useAuth();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [startDate, setStartDate] = useState('2026/01/12');
  const [endDate, setEndDate] = useState('2026/01/31');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!carData || !user) return;

    if (!fullName || !gender || !startDate || !endDate) {
      Alert.alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const rentalDays = Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime())/
        (1000 * 60 * 60 * 24)
      );

      const totalPrice = rentalDays * (carData?.price ?? 0);

      const response = await insertBooking({
        userId: user.id,
        carId: carData.id,
        carOwnerId: carData.user_id,
        fullName,
        gender,
        pickupLocation: carData.location,
        startDate,
        endDate,
        totalPrice,
      });
      
      if (response) {
        navigate('BookingPaymentScreen', {bookingId: response.id});
      }
    } catch (err) {
      console.error ('Booking failed:', err);
      Alert.alert('Booking failed!')
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Booking Details" hasBack />

      <ScrollView style={styles.main}>
        <StepperComponent active={1} />
        {renderMarginBottom(12)}
        <InputComponent leftAction={<MaterialIcons name="person-outline" size={scale(22)} color={colors.placeholder}/>} 
          containerStyle={styles.inputContainer} placeholder='Full Name' onChangeText={setFullName}/>
        {renderMarginBottom(12)}
        <TabSwitcher
          title="Gender"
          data={genderData}
          onPress={e => setGender(e.label)}
          selected={gender}
          tabContainerStyle={styles.tabContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
        />
        {renderMarginBottom(12)}
        <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateContainer}>
          <View>
            <Text style={styles.dateText}>Pickup Date</Text>
            <Text style={styles.date}>{startDate}</Text>
          </View>
          <View>
            <Text style={styles.dateText}>Return Date</Text>
            <Text style={styles.date}>{endDate}</Text>
          </View>
        </Pressable>
        {renderMarginBottom(12)}
        <Text style={styles.locationText}>Car Location : {carData?.location}</Text>
        {renderMarginBottom(12)}
        <Text style={styles.locationText}>Price Per Day: ${carData?.price}</Text>

        {renderMarginBottom(12)}
      </ScrollView>
      <Button onPress={handleBooking} text={loading ? 'Processing...' : 'Pay Now'} buttonStyles={styles.buttonStyle} disabled={loading}/>
      {renderMarginBottom(10)}
      <DateComponent visible={showDatePicker} setVisible={setShowDatePicker} onConfirm={(start, end) => { setStartDate(start); setEndDate(end);}}/>
    </View>
  );
};

export default BookingScreen;