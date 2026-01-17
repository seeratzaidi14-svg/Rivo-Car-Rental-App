import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import HeaderComponent from '../../../components/header/component';
import StepperComponent from '../../../components/stepper/component';
import { colors } from '../../../theme/colors';
import { renderMarginBottom } from '../../../utils/ui-utils';
import InputComponent from '../../../components/input/component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../../../theme/scale';
import TabSwitcher from '../../../components/tabSwitcher/component';
import { genderData, rentalData, } from '../../search/view/filter.data';
import DateComponent from '../../../components/date/component';
import Button from '../../../components/button/component';
import { createStyles } from './booking.styles';
import { navigate } from '../../../navigators/navigation-utilities';

const BookingScreen = () => {
  const styles = createStyles();
  const [isSwitchOn, setisSwitchOn] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderComponent title="Booking Details" hasBack />

      <ScrollView style={styles.main}>
        <StepperComponent active={1} />
        {renderMarginBottom(6)}
        <View style={styles.switchContainer}>
          <View>
             <Text style={styles.bookTitle}>Don't have a driver?</Text>
             <Text style={styles.bookText}>Book with a driver now.</Text>
          </View>
          <Switch value={isSwitchOn} onValueChange={setisSwitchOn} thumbColor={ isSwitchOn ? colors.black :colors.bell} trackColor={{true: colors.checkBoxBg, false: colors.outlineButtonBg}}/>
        </View>
        {renderMarginBottom(12)}
        <InputComponent leftAction={<MaterialIcons name="person-outline" size={scale(22)} color={colors.placeholder}/>} 
          containerStyle={styles.inputContainer} placeholder='Full Name' onChangeText={e => console.log(e)}/>
        <InputComponent leftAction={<MaterialCommunityIcons name="email-outline" size={scale(22)} color={colors.placeholder}/>}
          containerStyle={styles.inputContainer} placeholder='Email' onChangeText={e => console.log(e)}/>
        <InputComponent leftAction={<MaterialCommunityIcons name="phone-outline" size={scale(22)} color={colors.placeholder}/>}
          containerStyle={styles.inputContainer} placeholder='Contact' onChangeText={e => console.log(e)}/>
        {renderMarginBottom(12)}
        <TabSwitcher
          title="Gender"
          data={genderData}
          onPress={e => console.log(e)}
          tabContainerStyle={styles.tabContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
        />
        {renderMarginBottom(12)}
        <TabSwitcher
          title="Rental date and time"
          data={rentalData}
          onPress={e => console.log(e)}
          tabContainerStyle={styles.tabContainerStyle}
          tabStyle={[styles.tabStyle, styles.ph]}
          tabTextStyle={styles.tabTextStyle}
        />
        {renderMarginBottom(12)}
        <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateContainer}>
          <View>
            <Text style={styles.dateText}>Pickup Date</Text>
            <Text style={styles.date}>8 Jan 2026</Text>
          </View>
          <View>
            <Text style={styles.dateText}>Return Date</Text>
            <Text style={styles.date}>31 Jan 2026</Text>
          </View>
        </Pressable>
        {renderMarginBottom(12)}
        <Text style={styles.locationText}>Car Location</Text>
        <InputComponent onChangeText={() => console.log('')} placeholder='Enter location'/>
        {renderMarginBottom(12)}
      </ScrollView>
      <Button onPress={() => navigate('BookingPaymentScreen')} text='Pay Now' buttonStyles={styles.buttonStyle}/>
      {renderMarginBottom(10)}
      <DateComponent visible={showDatePicker} setVisible={setShowDatePicker}/>
    </View>
  );
};

export default BookingScreen;