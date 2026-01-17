import React, { use, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, TouchableOpacity, Image } from 'react-native';
import HeaderComponent from '../../../components/header/component';
import { createStyles } from './addCar.styles';
import { colors } from '../../../theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { launchImageLibrary } from 'react-native-image-picker';

const AddCar = () => {
  const styles = createStyles();
  const [carImage, setCarImage] = useState<string | null>(null);
  const [openBrand, setOpenBrand] = useState(false);
  const [brandValue, setBrandValue] = useState(null);
  const [brandItems, setBrandItems] = useState([
    { label: 'Toyota', value: 'toyota' },
    { label: 'Honda', value: 'honda' },
    { label: 'Ford', value: 'ford' },
    { label: 'Tesla', value: 'tesla' },
    { label: 'MG', value: 'mg' },
  ]);

  const [openSpecs, setOpenSpecs] = useState(false);
  const [specsValue, setSpecsValue] = useState(null);
  const [specsItems, setSpecsItems] = useState([
    { label: 'Automatic', value: 'automatic' },
    { label: 'Manual', value: 'manual' },
    { label: 'Electric', value: 'electric' },
    { label: 'Convertible', value: 'convertible' },
  ]);

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          const uri = response.assets[0].uri; 
          if (uri) {
            setCarImage(uri);
          }
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Add Cars" hasBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.imagePlaceholder}>
          {carImage ? (
            <Image source={{uri:carImage}} style={styles.uploadedImage}/>
          ) : ( 
            <>
              <Text style={styles.imageText}>No Image Selected</Text>

              <Pressable style={styles.uploadButton} onPress={handleImagePick}>
                 <FontAwesome name="camera" size={16} color={colors.white} />
                 <Text style={styles.uploadText}>Upload Image</Text>
            </Pressable>
          </>
          )}
          
          
        </View>

        <Text style={styles.label}>Car Name</Text>
        <TextInput style={styles.input} placeholder='Enter car name'></TextInput>

        <Text style={styles.label}>Car Brand</Text>
        <DropDownPicker open={openBrand} value={brandValue} items={brandItems} setOpen={setOpenBrand} setValue={setBrandValue} setItems={setBrandItems} placeholder="Select a brand" style = {styles.dropdownBox} dropDownContainerStyle={styles.dropdownContainer} textStyle={styles.dropDownText}/>

        <Text style={styles.label}>Car Specs</Text>
        <DropDownPicker open={openSpecs} value={specsValue} items={specsItems} setOpen={setOpenSpecs} setValue={setSpecsValue} setItems={setSpecsItems} placeholder="Select specs" style = {styles.dropdownBox} dropDownContainerStyle={styles.dropdownContainer} textStyle={styles.dropDownText}/>

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} placeholder='Enter location'></TextInput>

        <Text style={styles.label}>Price per Day</Text>
        <View style={styles.priceRow}>
          <View style={styles.priceIcon}>
            <Fontisto name="dollar" size={16} color={colors.white} />
          </View>
          <TextInput style={styles.priceInput} placeholder='Enter price' keyboardType='numeric'></TextInput>
        </View>

        <TouchableOpacity style={styles.submitButton}> 
          <Text style={styles.submitText}>Add Car</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddCar;
