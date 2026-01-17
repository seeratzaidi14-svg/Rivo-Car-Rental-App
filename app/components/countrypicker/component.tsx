import React from 'react';
import {BottomSheet} from '../bottomSheet/BottomSheet';
import {FlatList, Pressable, Text, View} from 'react-native';
import {createStyles} from './countrypicker.styles';
import {ICountryProps} from './ICountrypicker.props';

const countries = [
  {code: 'KW', name: 'Kuwait', flag: '🇰🇼', ph: '+965'},
  {code: 'PK', name: 'Pakistan', flag: '🇵🇰', ph: '+92'},
  {code: 'US', name: 'United States', flag: '🇺🇸', ph: '+1'},
  {code: 'GB', name: 'United Kingdom', flag: '🇬🇧', ph: '+44'},
  {code: 'FR', name: 'France', flag: '🇫🇷', ph: '+33'},
  {code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', ph: '+971'},
  {code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', ph: '+966'},
  {code: 'BH', name: 'Bahrain', flag: '🇧🇭', ph: '+973'},
  {code: 'OM', name: 'Oman', flag: '🇴🇲', ph: '+968'},
  {code: 'QA', name: 'Qatar', flag: '🇶🇦', ph: '+974'},
  {code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', ph: '+94'},
  {code: 'IN', name: 'India', flag: '🇮🇳', ph: '+91'},
];

const CountryComponent = ({onPress}: ICountryProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
  const styles = createStyles();

  return (
    <View>
      <Pressable
        onPress={() => setIsVisible(!isVisible)}
        style={styles.container}>
        <Text style={styles.text}>
          {selectedCountry?.flag}
          {'\t\t'}
          {selectedCountry?.name}
        </Text>
      </Pressable>
      <BottomSheet visible={isVisible} setVisible={setIsVisible}>
        <View style={styles.bottomSheet}>
          <FlatList
            data={countries}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  setSelectedCountry(item);
                  setIsVisible(false);
                  onPress(item);
                }}
                style={styles.itemContainer}>
                <Text style={styles.text}>
                  {item?.flag} {'\t\t'}
                  {item?.name}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default CountryComponent;
