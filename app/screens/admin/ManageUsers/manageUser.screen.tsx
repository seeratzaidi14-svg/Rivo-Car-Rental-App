import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import HeaderComponent from '../../../components/header/component';
import { createStyles } from './manageUser.styles';
import SearchComponent from '../../../components/search/component';
import assets from '../../../assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const dummyUsers = [
  { name: 'John Doe', email: 'johndoe@gmail.com', active: true },
  { name: 'John Doe', email: 'johndoe@gmail.com', active: true },
  { name: 'John Doe', email: 'johndoe@gmail.com', active: false },
  { name: 'John Doe', email: 'johndoe@gmail.com', active: true },
];

const ManageUsers = () => {
  const styles = createStyles();
  const {person} = assets;
  return (
    <View style={styles.container}>
      <HeaderComponent title="Manage Users" hasBack />
      <SearchComponent/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {dummyUsers.map((user, index) => (
          <View key={index} style={styles.userCard}>
            <View style={styles.userRow}>
              <Image source={person} style={styles.person}/>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>

              <View style={[styles.statusDot, {backgroundColor: user.active ? 'green' : 'red'}]}/>
              <Text style={styles.statusText}>{user.active ? 'active' : 'inactive'}</Text>
            </View>

            <View style={styles.buttonRow}>
              <Pressable style={styles.blockButton}>
                <MaterialIcons name="block" size={18} color="white" />
                <Text style={styles.blockText}>Block User</Text>
              </Pressable>

              <Pressable style={styles.deleteButton}>
                <MaterialIcons name="delete" size={18} color="white" />
                <Text style={styles.deleteText}>Delete User</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ManageUsers;