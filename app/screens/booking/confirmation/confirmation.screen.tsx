import React, { useEffect, useState } from "react";
import {View, Text, ScrollView, Image, ActivityIndicator} from "react-native"
import HeaderComponent from "../../../components/header/component";
import { createStyles } from "./confirmation.styles";
import StepperComponent from "../../../components/stepper/component";
import { renderBorderBottom, renderMarginBottom } from "../../../utils/ui-utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { scale } from "../../../theme/scale";
import { colors } from "../../../theme/colors";
import { navigate } from "../../../navigators/navigation-utilities";
import Button from "../../../components/button/component";
import { supabase } from "../../../services/supabaseClient";
import { useRoute } from "@react-navigation/native";

const BookingConfirmationScreen = () => {
    const styles = createStyles();
     const route = useRoute<any>();
    const bookingId = route.params?.bookingId;

    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingData = async () => {
            if(!bookingId) return;

            const {data, error} = await supabase
            .from("bookings")
            .select("*, car_id(*), payments(*)")
            .eq("id", bookingId)
            .single();

            if (error) {
                console.error("Error fetching booking:", error.message);
                setLoading(false);
                return;
            }
            setBooking(data);
            setLoading(false);
        };
        fetchBookingData();
    }, [bookingId]);

    if (loading || !booking) {
        return(
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color={colors.primary} />
           </View>
        );
    }

    const car = booking.car_id;
    const payment = booking.payments?.[0];

    return (
        <View style={styles.container}>
            <HeaderComponent title="Confirmation" hasBack/>
            <ScrollView style={styles.main}>
                <StepperComponent active={3}/>
                 <Image source={{uri: car?.image_url || 'https://placehold.co/400x250/png?text=Car'}} 
                    resizeMode="cover" style={styles.image}
                  />
                 {renderMarginBottom(12)}
                <View style={styles.titleContainer}>
                    <View style={styles.flex}>
                        <Text style={styles.title}>{car?.car_name || "Car Name"}</Text>
                        {renderMarginBottom(4)}
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
                    <Text style={styles.value}>{booking?.id}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Name</Text>
                    <Text style={styles.value}>{booking?.full_name}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Pickup Date</Text>
                    <Text style={styles.value}>{booking?.start_date}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Return Date</Text>
                    <Text style={styles.value}>{booking?.end_date}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Location</Text>
                    <Text style={styles.value}>{booking?.pickup_location}</Text>
                </View>
                {renderBorderBottom(1)}
                {renderMarginBottom(12)}
                <Text style={styles.title}>Payment</Text>
                {renderMarginBottom(12)}
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Txt ID</Text>
                    <Text style={[styles.value, styles.bold]}>{payment?.id || "N/A"}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Amount</Text>
                    <Text style={[styles.value, styles.bold]}>${booking?.total_price}</Text>
                </View>
                {renderBorderBottom(1)}
                {renderMarginBottom(12)}
                <View style={styles.horizontalContainer}>
                    <Text style={[styles.value, styles.bold]}>Total</Text>
                    <Text style={[styles.value, styles.bold]}>${booking?.total_price || 0}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.key}>Payment with</Text>
                    <Text style={styles.value}>{payment?.method || "N/A"}</Text>
                </View>
            </ScrollView>
            <Button onPress={() => navigate('BookingStatusScreen', {bookingId})} text='Pay Now'/>
        </View>
    );
};

export default BookingConfirmationScreen;