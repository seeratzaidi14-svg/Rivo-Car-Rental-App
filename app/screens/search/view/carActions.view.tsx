import { View, Text, Pressable } from "react-native";
import React from "react";
import { createStyles } from "../search.styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import { colors } from "../../../theme/colors";
import { scale } from "../../../theme/scale";
import Button from "../../../components/button/component";
import { navigate } from "../../../navigators/navigation-utilities";

interface ICarActions{

}

const CarActionView = () => {
    const styles=createStyles();
    return (
     <View style={[styles.flex, styles.priceContainer]}>
       <View style={ styles.flex}>
           <Pressable style={styles.dollarContainer}>
               <Fontisto name="dollar" size={scale(8)} color={colors.bell}/>
           </Pressable>
                <Text style={[styles.text, styles.textBold, styles.price]}>175/Day</Text>
       </View>
       <Button onPress={() => navigate("rootStack", { screen: "BookingScreen" })} text="Book Now" buttonStyles={styles.buttonStyles} textStyles={styles.textStyles}/>
     </View>
    );
};

export default CarActionView;
