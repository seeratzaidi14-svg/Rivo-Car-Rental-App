import React, { use, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../components/header/component';
import { createStyles } from './addCar.styles';
import { supabase } from '../../services/supabaseClient';
import { launchImageLibrary } from 'react-native-image-picker';
import InputComponent from '../../components/input/component';
import Button from '../../components/button/component';
import { uploadCarAndInsert } from '../../utils/uploadCarAndInsert';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import HomeScreen from '../home/home.screen';

const AddCarScreen = () => {
  const styles = createStyles();
  const navigation = useNavigation();

  const [carName, setCarName] = useState('');
  const [brand, setBrand] = useState('');
  const [seats, setSeats] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [fuelType, setFuelType] = useState(null);
  const [transmission, setTransmission] = useState(null);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [fuelOpen, setFuelOpen] = useState(false);
  const [fuelItems, setFuelItems] = useState([
    {label: 'Petrol', value: 'Petrol'},
    {label: 'Diesel', value: 'Diesel'},
    {label: 'Hybrid', value: 'Hybrid'},
    {label: 'Electric', value: 'Electric'},
  ]);

  const [transmissionOpen, setTransmissionOpen] = useState(false);
  const [transmissionItems, setTransmissionItems] = useState([
    {label: 'Automatic', value: 'Automatic'},
    {label: 'Manual', value: 'Manual'},
  ]);

  const [brandOpen, setBrandOpen] = useState(false);
  const [brandValue, setBrandValue] = useState(null);
  const [brandItems, setBrandItems] = useState([
    {label: 'Toyota', value: 'Toyota'},
    {label: 'Audi', value: 'Audi'},
    {label: 'Hyundai', value: 'Hyundai'},
    {label: 'Kia', value: 'Kia'},
    {label: 'MG', value: 'MG'},
    {label: 'BMW', value: 'BMW'},
    {label: 'Ford', value: 'Ford'},
    {label: 'Mercedes', value: 'Mercedes'},
    {label: 'Other', value: 'Other'},
  ]);

  const pickImage = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    quality: 0.7,
    includeBase64: true,
  });
  if (!result.didCancel && result.assets?.length) {
    setImage(result.assets[0]);
  }
};

  const handleAddCar = async () => {
  if (!carName || !brand || !location || !price || !image || !seats || !fuelType || !transmission) {
    Alert.alert('Please fill all fields');
    return;
  }

  try {
    setLoading(true);

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const carData = {
      car_name: carName,
      brand: brand,
      seats: seats,
      fuel_type: fuelType,
      transmission: transmission,
      location: location,
      price: Number(price),
      image_url: '',
      user_id: user.id,
    };

    await uploadCarAndInsert(image,carData);

    Alert.alert('Success', 'Car added successfully!', [{
      text: 'OK',
      onPress: () => {
        setCarName('');
        setBrand('');
        setSeats('');
        setLocation('');
        setPrice('');
        setFuelType(null);
        setTransmission(null);
        setImage(null);
        (navigation as any).navigate('tabStack', {
          screen : 'HomeScreen',
          params: {refresh: true}
        });
      },
    }
  ]);
  } catch (err: any) {
    Alert.alert('Error', err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <HeaderComponent title="Add Cars" hasBack />
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
       <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
         <Text style={styles.sectionTitle}>Car Information</Text>
         <InputComponent placeholder='Car Name' onChangeText={setCarName}/>
              <DropDownPicker
                open={brandOpen}
                value={brandValue}
                items={brandItems}
                setOpen={setBrandOpen}
                setValue={(callback) => {
                   const value = callback(brandValue);
                   setBrandValue(value);
                   setBrand(value);
                 }}
                setItems={setBrandItems}
                placeholder='Select Brand'
                listMode='SCROLLVIEW'
                maxHeight={200}
                style={styles.dropDownList}
             />
         <InputComponent placeholder='Seats' onChangeText={setSeats} keyboardType='numeric'/>
           <DropDownPicker
            open={fuelOpen}
            value={fuelType}
            items={fuelItems}
            setOpen={setFuelOpen}
            setValue={setFuelType}
            setItems={setFuelItems}
            placeholder='Fuel Type'
            listMode='SCROLLVIEW'
            maxHeight={160}
            style={styles.dropDownList1}
         />
            <DropDownPicker
            open={transmissionOpen}
            value={transmission}
            items={transmissionItems}
            setOpen={setTransmissionOpen}
            setValue={setTransmission}
            setItems={setTransmissionItems}
            placeholder='Transmission'
            listMode='SCROLLVIEW'
            maxHeight={140}
            style={styles.dropDownList2}
         />
         <InputComponent placeholder='Location' onChangeText={setLocation}/>
         <InputComponent placeholder='Price per day' keyboardType='numeric' onChangeText={setPrice}/>

         <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
           <Text style={styles.imagePickerText}>
             {image ? 'Change Image' : 'Pick Car Image'}
           </Text>
         </TouchableOpacity>

         {image && (
           <Image source={{uri: image.uri}} style={styles.previewImage}/>
         )}

         <Button text={loading ? 'Adding...' : 'Add Car'} onPress={handleAddCar} buttonStyles={styles.addButton}/>
       </KeyboardAwareScrollView>
     </KeyboardAvoidingView>
    </View>
  );
};

export default AddCarScreen;
