import React from "react";
import {View, Text, ScrollView, Image} from "react-native"
import HeaderComponent from "../../../components/header/component";
import { createStyles } from "./confirmation.styles";
import StepperComponent from "../../../components/stepper/component";
import { renderBorderBottom, renderMarginBottom } from "../../../utils/ui-utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { scale } from "../../../theme/scale";
import { colors } from "../../../theme/colors";
import { navigate } from "../../../navigators/navigation-utilities";
import Button from "../../../components/button/component";

const BookingConfirmationScreen = () => {
    const styles = createStyles();
    return (
        <View style={styles.container}>
            <HeaderComponent title="Confirmation" hasBack/>
            <ScrollView style={styles.main}>
                <StepperComponent active={3}/>
                 <Image source={{uri: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?_gl=1*mpdcu2*_ga*ODQ4NjE0NzkzLjE3NTc5MjI1NTI.*_ga_8JE65Q40S6*czE3NjUyNzgwODckbzMkZzEkdDE3NjUyNzg0NTAkajU5JGwwJGgw',}} resizeMode="cover" style={styles.image}/>
                 {renderMarginBottom(12)}
                <View style={styles.titleContainer}>
                    <View style={styles.flex}>
                        <Text style={styles.title}>Tesla Model S</Text>
                        {renderMarginBottom(4)}
                        <Text style={styles.text}>A car with high specs that is rented at an affordable price</Text>
                    </View>
                    <View>
                     <View style={styles.reviewContainer}>
                         <Text style={styles.textBold}>5.0 <FontAwesome name="star" size={scale(18)} color={colors.star}/></Text>
                     </View>
                     <Text style={styles.text}>(100+ Reviews)</Text>
                    </View>
                </View>
                {renderMarginBottom(12)}
                {renderBorderBottom(1)}
                {renderMarginBottom(12)}
                <Text style={styles.title}>Booking Information</Text>
                {renderMarginBottom(12)}
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Booking ID</Text>
                    <Text style={styles.value}>140503</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Name</Text>
                    <Text style={styles.value}>John Doe</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Pickup Date</Text>
                    <Text style={styles.value}>8 Jan 2026</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Return Date</Text>
                    <Text style={styles.value}>31 Jan 2026</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Location</Text>
                    <Text style={styles.value}>Salwa, Kuwait</Text>
                </View>
                {renderBorderBottom(1)}
                {renderMarginBottom(12)}
                <Text style={styles.title}>Payment</Text>
                {renderMarginBottom(12)}
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Txt ID</Text>
                    <Text style={[styles.value, styles.bold]}>Booking ID</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Amount</Text>
                    <Text style={[styles.value, styles.bold]}>$1500</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Service Fee</Text>
                    <Text style={[styles.value, styles.bold]}>$15</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Return Date</Text>
                    <Text style={[styles.value, styles.bold]}>31 Jan 2026, 12:30 PM</Text>
                </View>
                {renderBorderBottom(1)}
                {renderMarginBottom(12)}
                <View style={styles.horizontalContainer}>
                    <Text style={[styles.value, styles.bold]}>Total</Text>
                    <Text style={[styles.value, styles.bold]}>$1515</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Payment with</Text>
                    <Text style={styles.value}>Credit Card</Text>
                </View>
            </ScrollView>
            <Button onPress={() => navigate('BookingStatusScreen')} text='Pay Now'/>
        </View>
    );
};

export default BookingConfirmationScreen;