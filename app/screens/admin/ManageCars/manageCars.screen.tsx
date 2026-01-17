import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import HeaderComponent from '../../../components/header/component';
import { createStyles } from './manageCar.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../theme/colors';
import { scale } from '../../../theme/scale';
import Fontisto from 'react-native-vector-icons/Fontisto';

const dummyCars = [1, 2, 3, 4, 5];

const ManageCars = () => {
  const styles = createStyles();
  return (
    <View style={styles.container}>
      <HeaderComponent title="Manage Cars" hasBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {dummyCars.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.carImagePlaceholder}>
              <Text style={styles.imageText}>Insert image here</Text>
            </View>

            <View style={styles.carInfo}>
              <Text style={styles.carTitle}>Tesla Model S</Text>
              <Text style={styles.carLocation}>Salwa, Kuwait</Text>

              <View style={styles.specsRow}>
                 <MaterialCommunityIcons name="sofa-single-outline" color={colors.bell} size={scale(18)} />
                  <Text style={styles.specsText}>5 Seats</Text>
              </View>

              <View style={styles.specsRow}>
                <Fontisto name="dollar" size={scale(13)} color={colors.bell}/>
                  <Text style={styles.specsText}>210/Day</Text>
              </View>

              <View style={styles.actionRow}>
                <Pressable style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </View>

            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ManageCars;