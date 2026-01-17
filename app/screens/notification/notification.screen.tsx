import React from 'react';
import {FlatList, SectionList, Text, View} from 'react-native';
import HeaderComponent from '../../components/header/component';
import {renderMarginBottom} from '../../utils/ui-utils';
import { createStyles } from './notification.styles';
import SingleItem from './singleItem';

const NotificationScreen = () => {
    const styles = createStyles();
    const notifications = [
    {
        title: 'Today',
        data: [
            {id:1, unRead: true, title: 'Car Booking Succesful!', time:'10:00 AM', text: 'Your car is ready! Check your email...'},
            {id:2, unRead: true, title: 'Payment Notification', time:'10:00 AM', text: 'Your payment was proceeded sucessfully! '},
            {id:3, unRead: true, title: 'Car Pickup/Dropoff time', time:'09:00 AM', text: 'Pickup time confirmed! See you at...'}
        ],
    },
    {
      title: 'Previous',
      data: [
        {id: 4, unRead: false, title: 'Late Return Warning', time: 'Yesterday', text: 'Please return the car as soon as possible...'},
        {id: 5, unRead: false, title: 'Cancellation Notice', time: 'Yesterday', text: 'Your reservation has been cancelled...'},
        {id: 6, unRead: false, title: 'Discount Notification', time: 'Yesterday', text: 'You’ve unlocked a 10% discount...'},
      ],
    },
];
    return (
    <View style={styles.container}>
      <HeaderComponent title="Notification" hasBack />
      {renderMarginBottom(12)}

      <SectionList
        sections={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <SingleItem
            unRead={item.unRead}
            title={item.title}
            time={item.time}
            text={item.text}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={{marginLeft: 16, marginBottom: 8, fontWeight: '600', fontSize: 16}}>
            {title}
          </Text>
        )}
        contentContainerStyle={{paddingBottom: 80}}
      />
    </View>
  );
};

export default NotificationScreen;