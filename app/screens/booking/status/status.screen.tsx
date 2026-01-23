import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { createStyles } from "./status.styles";
import assets from "../../../assets";
import HeaderComponent from "../../../components/header/component";
import { renderBorderBottom, renderMarginBottom } from "../../../utils/ui-utils";
import Button from "../../../components/button/component";
import { colors } from "../../../theme/colors";
import { navigate } from "../../../navigators/navigation-utilities";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../../services/supabaseClient";

const BookingStatusScreen = () => {
    const styles = createStyles();
   const route = useRoute<any>();
  const bookingId = route.params?.bookingId;
  const { success } = assets;

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const { data, error } = await supabase
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

    fetchBookingDetails();
  }, [bookingId]);

  if (loading || !booking) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const car = booking.car_id;
  const payment = booking.payments?.[0];
  
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
                    <Text style={[styles.value, styles.bl]}>{car?.car_name}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Rental Date</Text>
                    <Text style={[styles.value, styles.bl]}>{booking?.start_date} - {booking?.end_date}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Name</Text>
                    <Text style={[styles.value, styles.bl]}>{booking?.full_name}</Text>
                </View>
                {renderMarginBottom(12)}
                {renderBorderBottom(1)}
                {renderMarginBottom(12)}
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Transaction ID</Text>
                    <Text style={[styles.value, styles.bl]}>{payment?.id || "N/A"}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Transaction Date</Text>
                    <Text style={[styles.value, styles.bl]}>{payment?.created_at?.slice(0, 10) || "N/A"}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.value}>Payment Method</Text>
                    <Text style={[styles.value, styles.bl]}>{payment?.method || "N/A"}</Text>
                </View>
                {renderMarginBottom(4)}
                {renderBorderBottom(1)}
                {renderMarginBottom(18)}
                <View style={styles.horizontalContainer}>
                    <Text style={[styles.value, styles.bold, styles.bl]}>Total Amount</Text>
                    <Text style={[styles.value, styles.bold, styles.bl]}>${booking?.total_price || 0}</Text>
                </View>
            </View>
            {renderMarginBottom(8)}
            {renderMarginBottom(14)}
          </ScrollView> 
          <Button onPress={() => navigate('tabStack', { screen: 'NotificationScreen' })} text="Done" buttonStyles={styles.btn}/>  
            {renderMarginBottom(12)}
        </View>     
    );
};

export default BookingStatusScreen;
