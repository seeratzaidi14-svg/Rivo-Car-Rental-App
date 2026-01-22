import React, {useState} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import HeaderComponent from '../../../components/header/component';
import {createStyles} from './payment.styles';
import StepperComponent from '../../../components/stepper/component';
import VisaCard from '../../../components/visaCard/component';
import {renderMarginBottom} from '../../../utils/ui-utils';
import Button from '../../../components/button/component';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../theme/colors';
import {scale} from '../../../theme/scale';
import {BottomSheet} from '../../../components/bottomSheet/BottomSheet';
import InputComponent from '../../../components/input/component';
import CountryComponent from '../../../components/countrypicker/component';
import CheckBoxComponent from '../../../components/checkbox/component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navigate} from '../../../navigators/navigation-utilities';
import { useRoute } from '@react-navigation/native';
import { insertPayment } from '../../../services/payment.services';

const BookingPaymentScreen = () => {
  const styles = createStyles();
  const [showPayment, setShowPayment] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('credit_card');

  const route = useRoute<any>();
  const bookingId = route?.params?.bookingId; // this will now be a plain string




  const handlePayment = async (methodOverride?: string) => {
    if (!agreed) {
        Alert.alert('Notice', 'You must accept the Terms and Conditions.');
        return;
    }

    try {
        if (!bookingId) throw new Error('Missing booking ID');

        const methodToUse = methodOverride || selectedMethod;

        await insertPayment({
            bookingId: bookingId,
            method: methodToUse,
            status: 'paid'
        });
        navigate('BookingConfirmationScreen', {bookingId});
    } catch (err: any) {
    console.error('Payment failed:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    Alert.alert('Error', 'Payment failed. please try again!');
}

  };

  return (
    <View style={styles.container}>
        <HeaderComponent title="Payment Methods" hasBack/>
        <ScrollView style={styles.main}>
            <StepperComponent active={2}/>
            {renderMarginBottom(6)}
            <VisaCard/>
            {renderMarginBottom(6)}
            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Select payment method</Text>
                <Pressable style={styles.selectPayment} onPress={() => setShowPayment(true)}>
                    <View style={styles.rg}>
                       <FontAwesome name="money" size={scale(18)} color={colors.bell} />
                       <Text style={styles.selectPaymentText}>{selectedMethod.replace('_', ' ')}</Text>
                    </View>
                    <Button onPress={() => setShowPayment(true)} text="Change" buttonStyles={styles.buttonStyles} textStyles={styles.buttonText} />
                </Pressable>
                {renderMarginBottom(22)}
                <Text style={styles.labelText}>Card Informtation</Text>
                <InputComponent onChangeText={(e) => {}} placeholder='Full Name'/>
                <InputComponent onChangeText={(e) => {}} placeholder='Number'/>
                <View style={styles.rg}>
                   <InputComponent onChangeText={(e) => {}} placeholder='MM/YY' containerStyle={styles.inputStyle}/>
                   <InputComponent onChangeText={(e) => {}} placeholder='CVV'   containerStyle={styles.inputStyle}/>
                </View>
                {renderMarginBottom(22)}
                <Text style={styles.labelText}>Region</Text>
                <CountryComponent onPress={(e) => console.log(e)}/>
                {renderMarginBottom(12)}
                <View style={styles.flexRow}>
                    <CheckBoxComponent onPress={() => setAgreed(!agreed)} isChecked ={agreed}/>
                    <Text style={styles.checkBoxText}>Terms & Conditions</Text>
                </View>
                <View style={styles.borderContainer}>
                    <View style={styles.orBorder}/>
                        <Text style={styles.orText}>Pay with card or</Text>
                    <View style={styles.orBorder}/>
                </View>
                {renderMarginBottom(12)}
                <Button text='Google Pay' textStyles={styles.outlineButtonText} buttonStyles={styles.iconButtonStyle} component={<AntDesign name="google" size={scale(20)}/>} onPress={() => handlePayment('google_pay')}/>
                {renderMarginBottom(14)}
                <Button text='Apple Pay' textStyles={styles.outlineButtonText} buttonStyles={styles.iconButtonStyle} component={<MaterialIcons name="apple" size={scale(22)}/>} onPress={() => handlePayment('apple_pay')}/>
                {renderMarginBottom(24)}
                <Button onPress={() => handlePayment('manual')} text='Pay Now'/>
            </View>
            <BottomSheet visible={showPayment} setVisible={setShowPayment}>
                <View style={styles.paymentContainer}>
                    <Text onPress={() => {setSelectedMethod('debit_card'); setShowPayment(false);}} style={styles.paymentText}>Debit Card</Text>
                    <Text onPress={() => {setSelectedMethod('credit_card'); setShowPayment(false);}} style={styles.paymentText}>Credit Card</Text>
                </View>
            </BottomSheet>
        </ScrollView>
    </View>
  );
};

export default BookingPaymentScreen;