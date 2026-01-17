import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { createStyles } from "./status.styles";
import assets from "../../../assets";
import HeaderComponent from "../../../components/header/component";
import { renderBorderBottom, renderMarginBottom } from "../../../utils/ui-utils";
import Button from "../../../components/button/component";
import { colors } from "../../../theme/colors";
import { scale } from "../../../theme/scale";
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { navigate } from "../../../navigators/navigation-utilities";

const BookingStatusScreen = () => {
    const styles = createStyles();
    const {success} = assets;
    return (
        <View style={styles.container}>
          <HeaderComponent title="Payment Status" hasBack />
          <ScrollView style={styles.main}>
            <View style={styles.successContainer}>
             <Image resizeMode="contain" source={success} style={styles.successImage}/>
             {renderBorderBottom(18)}
             <Text style={styles.title}>Payment Successful</Text>
             {renderBorderBottom(4)}
             <Text style={styles.infoText}>Your rental car booking is successful!</Text>
            </View>
            {renderMarginBottom(18)}
            <View style={styles.bookingInfo}>
                <Text style={[styles.title, styles.f14]}>Booking Information</Text>
                {renderMarginBottom(12)}
                {renderBorderBottom(1)}
                {renderMarginBottom(12)}
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Car Model</Text>
                    <Text style={[styles.value, styles.bl]}>Tesla Model S</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Rental Date</Text>
                    <Text style={[styles.value, styles.bl]}>8 Jan - 31 Jan, 2026</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Name</Text>
                    <Text style={[styles.value, styles.bl]}>John Doe</Text>
                </View>
                {renderMarginBottom(12)}
                {renderBorderBottom(1)}
                {renderMarginBottom(12)}
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Transaction ID</Text>
                    <Text style={[styles.value, styles.bl]}>#TS100259</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Transaction Date</Text>
                    <Text style={[styles.value, styles.bl]}>5 Jan, 2026</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Payment Method</Text>
                    <Text style={[styles.value, styles.bl]}>Credit Card</Text>
                </View>
                {renderMarginBottom(4)}
                {renderBorderBottom(1)}
                {renderMarginBottom(18)}
                <View style={styles.horizontalContainer}>
                    <Text style={[styles.value, styles.bold, styles.bl]}>Total Amount</Text>
                    <Text style={[styles.value, styles.bold, styles.bl]}>$1515</Text>
                </View>
            </View>
            {renderMarginBottom(8)}
            <Button text="Download Receipt" textStyles={styles.outlineButtonText} buttonStyles={styles.downloadBtn} component={<Feather name="download" size={scale(20)} color={colors.bell}/>}/>
            {renderMarginBottom(14)}
            <Button text="Share your receipt" textStyles={styles.outlineButtonText} buttonStyles={styles.shareBtn} component={<EvilIcons name="share-google" size={scale(30)} color={colors.bell}/>}/>
            {renderMarginBottom(14)}
          </ScrollView> 
          <Button onPress={() => navigate('BookingStatusScreen')} text="Confirm" buttonStyles={styles.btn}/>  
            {renderMarginBottom(12)}
        </View>     
    );
};

export default BookingStatusScreen;
