import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../../theme/colors';
import {scale} from '../../theme/scale';
import {renderMarginBottom} from '../../utils/ui-utils';
import {createStyles} from './car.styles';
import { ICarComponentProps } from './ICar.props';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CarComponent = ({name, location, image_url, rating, seats, pricePerDay, onPress, bottomActions,}: ICarComponentProps) => {
  const styles = createStyles();
  console.log('IMAGE URL:', image_url);
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.carBackground}>
          <Image source={{ uri: image_url?.startsWith('http') ? image_url : 'https://placehold.co/400x250/png?text=Car' }} resizeMode='cover' style={styles.carImage}/>
        </View>
        <View style={styles.textContainer}>
          {renderMarginBottom(4)}
            <Text style={styles.title}>{name}</Text>
            {renderMarginBottom(4)}
            <View style={styles.flex}>
                <Text style={styles.title}>{(rating ?? 4.5).toFixed(1)}{' '}</Text>
                <FontAwesome name="star" size={scale(14)} color={colors.star}/>
            </View>
            {renderMarginBottom(4)}
            <View style={styles.flex}>
                <MaterialIcons name="location-pin" size={scale(16)} color={colors.bell}/>
                <Text style={styles.text}>{location}</Text>
            </View>
            {renderMarginBottom(6)}
            <View style={[styles.flex, styles.priceContainer]}>
              <View style={styles.flex}>
                <MaterialCommunityIcons name="sofa-single-outline" size={scale(16)} color={colors.bell}/>
                <Text style={[styles.text, styles.textBold]}>{seats} Seats</Text>
             </View>
             <View style={styles.flex}>
                <Pressable style={styles.dollarContainer}>
                  <Fontisto name="dollar" size={scale(8)} color={colors.bell}/>
                </Pressable>
                <Text style={[styles.text, styles.textBold, styles.price]}>{pricePerDay}/Day</Text>
             </View>
            </View>
        </View>
    </Pressable>
  );
};

export default CarComponent;
