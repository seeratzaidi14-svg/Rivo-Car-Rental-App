import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import { createStyles } from "./profile.styles";
import HeaderComponent from "../../../components/header/component";
import assets from "../../../assets";
import { navigate } from "../../../navigators/navigation-utilities";
import { colors } from "../../../theme/colors";
import Feather from "react-native-vector-icons/Feather";
import { scale } from "../../../theme/scale";
import { renderMarginBottom } from "../../../utils/ui-utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SingleList from "../../../components/singleList/component";

const ProfileScreen = () => {
    const styles = createStyles();
    const {person} = assets;
    return (
        <View style={styles.container}>
           <HeaderComponent title="Profile" hasBack />
           <ScrollView style={styles.main}>
            {renderMarginBottom(6)}
            <View style={styles.profileContainer}>
                <View style={styles.frcg}>
                    <Image source={person} style={styles.profileImage}/>
                    <View>
                        <Text style={styles.title}>John Doe</Text>
                        <Text style={styles.email}>johndoe@gmail.com</Text>
                    </View>
                </View>
                <Pressable onPress={() => console.log()} style={styles.aic}>
                    <Feather name="edit-3" size={scale(18)} color={colors.bell}/>
                    <Text style={styles.editProfile}>Edit Profile</Text>
                </Pressable>
            </View>
            {renderMarginBottom(12)}
            <Text style={styles.title}>General</Text>
            {renderMarginBottom(6)}
            <Pressable onPress={() => navigate('rootStack', {screen: 'FavCarScreen',})}>
                <SingleList component={<MaterialCommunityIcons name="cards-heart-outline" size={scale(24)} color={colors.bell} />} text={"Favourite Cars"}/>
            </Pressable>
            <Pressable onPress={() => navigate('rootStack', {screen: 'PastBookingScreen'})}>
                <SingleList component={<MaterialCommunityIcons name="av-timer" size={scale(24)} color={colors.bell} />} text={"Previous Bookings"}/>
            </Pressable>
            <Pressable onPress={() => navigate('rootStack', {screen: 'AddCarScreen',})}>
                <SingleList component={<MaterialCommunityIcons name="car-multiple" size={scale(24)} color={colors.bell} />} text={"Add Car"}/>
            </Pressable>
            <SingleList component={<MaterialCommunityIcons name="logout" size={scale(24)} color={colors.bell} />} text={"Logout"}/>
            {renderMarginBottom(12)}
            {renderMarginBottom(32)}
            {renderMarginBottom(40)}
           </ScrollView>
        </View>
    );
};

export default ProfileScreen;
