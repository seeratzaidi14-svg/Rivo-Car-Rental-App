import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import HeaderComponent from '../../../components/header/component';
import InputComponent from '../../../components/input/component';
import { createStyles } from './viewBookings.styles';
import { colors } from '../../../theme/colors';
import { scale } from '../../../theme/scale';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import assets from '../../../assets'; // if you're using placeholder images

const ViewBookings = () => {
  const styles = createStyles();
  const [activeTab, setActiveTab] = useState('upcoming');

  const dummyBookings = [1, 2, 3]; // replace with real data later

  return (
    <View style={styles.container}>
      <HeaderComponent title="View Bookings" hasBack />

      <View style={styles.searchWrapper}>
        <InputComponent
          placeholder="Search your dream car..."
          leftAction={<FontAwesome name="search" size={scale(18)} color={colors.bell} />}
          onChangeText={(text) => console.log(text)}
        />
      </View>

      {/* Booking Tabs */}
      <View style={styles.tabRow}>
        {['upcoming', 'completed', 'cancelled'].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {dummyBookings.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>INSERT CAR IMAGE HERE</Text>
              </View>

              <View style={styles.carInfo}>
                <Text style={styles.carTitle}>Tesla Model S</Text>
                <Text style={styles.carLocation}>location</Text>

                <View style={styles.specsRow}>
                  <MaterialCommunityIcons name="car-seat" size={scale(14)} color={colors.bgTab} />
                  <Text style={styles.specsText}>4 Seats</Text>
                  <FontAwesome name="dollar" size={scale(12)} color={colors.bgTab} style={styles.dollarIcon}/>
                  <Text style={styles.specsText}>210/Day</Text>

                  <Pressable style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.cardBottomRow}>
              <View style={styles.statusRow}>
                <FontAwesome name="check-circle" size={scale(16)} color={colors.primary} />
                <Text style={styles.statusText}>confirmed</Text>
              </View>

              <View style={styles.dateRow}>
                <FontAwesome name="calendar" size={scale(14)} color={colors.bgTab} />
                <Text style={styles.dateText}>14/01 - 14/02</Text>
                <Text style={styles.durationText}>32 days</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewBookings;
