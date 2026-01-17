import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { createStyles } from './dashboard.styles';
import HeaderComponent from '../../../components/header/component';
import SearchComponent from '../../../components/search/component';
import { renderMarginBottom } from '../../../utils/ui-utils';
import AdminDashboardButton from '../../../components/admin/tabButton/adminDashboard.button';
import { AddCarIcon, BookingIcon, CarIcon, MessageIcon, UserIcon } from '../../../assets/icons/admin.icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type AdminNavigationProp = NavigationProp<{
  ManageCars: undefined;
  AddCar: undefined;
  ViewBookings: undefined;
  UserMessages: undefined;
  ManageUsers: undefined;
}>;

const AdminDashboard = () => {

const styles = createStyles();
const navigation = useNavigation<AdminNavigationProp>();

return (
<View style={styles.container}>
    <HeaderComponent title="Rivo"/>
    <View style={styles.main}>
        <SearchComponent />
        {renderMarginBottom(12)}

      <View style={styles.gridRow}>
           <AdminDashboardButton icon={<CarIcon/>} label="Manage Cars" onPress={() => navigation.navigate('ManageCars')}/>
           <AdminDashboardButton icon={<AddCarIcon/>}  label="Add Car" onPress={() => navigation.navigate('AddCar')}/>
      </View>
      {}
      <View style={styles.gridRow}>
           <AdminDashboardButton icon={<BookingIcon/>} label="View Bookings"  onPress={() => navigation.navigate('ViewBookings')}/>
           <AdminDashboardButton icon={<MessageIcon/>}  label="User Messages" onPress={() => navigation.navigate('UserMessages')}/>
      </View>
      <View style={styles.fullWidthButton}>
           <AdminDashboardButton icon={<UserIcon/>} label="Manage Users"  onPress={() => navigation.navigate('ManageUsers')}/>
      </View>
      {renderMarginBottom(150)}
      <View style={styles.tabBar}>
           <Pressable onPress={() => navigation.navigate('ManageCars')}> <CarIcon/></Pressable>
           <Pressable onPress={() => navigation.navigate('AddCar')}> <AddCarIcon/></Pressable>
           <Pressable onPress={() => navigation.navigate('ViewBookings')}> <BookingIcon/></Pressable>
           <Pressable onPress={() => navigation.navigate('UserMessages')}> <MessageIcon/></Pressable>
           <Pressable onPress={() => navigation.navigate('ManageUsers')}> <UserIcon/></Pressable>
      </View>
   </View>   
</View>
);};

export default AdminDashboard;