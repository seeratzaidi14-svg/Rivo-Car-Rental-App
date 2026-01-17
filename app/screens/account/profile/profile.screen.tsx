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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                <Pressable onPress={() => navigate('rootStack', {screen: 'EditScreen',})} style={styles.aic}>
                    <Feather name="edit-3" size={scale(18)} color={colors.bell}/>
                    <Text style={styles.editProfile}>Edit Profile</Text>
                </Pressable>
            </View>
            {renderMarginBottom(12)}
            <Text style={styles.title}>General</Text>
            {renderMarginBottom(6)}
            <SingleList component={<MaterialCommunityIcons name="cards-heart-outline" size={scale(24)} color={colors.bell} />} text={"Favourite Cars"}/>
            <SingleList component={<MaterialCommunityIcons name="av-timer" size={scale(24)} color={colors.bell} />} text={"Previous Rent"}/>
            <SingleList component={<MaterialCommunityIcons name="bell-outline" size={scale(24)} color={colors.bell} />} text={"Notification"}/>
            {renderMarginBottom(12)}
            <Text style={styles.title}>Support</Text>
            {renderMarginBottom(6)}
            <SingleList component={<SimpleLineIcons name="settings" size={scale(24)} color={colors.bell} />} text={"Settings"}/>
            <SingleList component={<Ionicons name="language-outline" size={scale(24)} color={colors.bell} />} text={"Languages"}/>
            <SingleList component={<Ionicons name="person-add-outline" size={scale(20)} color={colors.bell} />} text={"Invite Friends"}/>
            <SingleList component={<MaterialIcons name="policy" size={scale(24)} color={colors.bell} />} text={"Privacy Policy"}/>
            <SingleList component={<MaterialCommunityIcons name="headphones" size={scale(24)} color={colors.bell} />} text={"Customer Support"}/>
            <SingleList component={<MaterialCommunityIcons name="logout" size={scale(24)} color={colors.bell} />} text={"Logout"}/>
            <Pressable  onPress={() => navigate('AdminStack', {screen: 'AdminDashboard',})}>
                <SingleList component={<MaterialCommunityIcons name="logout" size={scale(24)} color={colors.bell} />} text={"Admin"}/>
            </Pressable>
            {renderMarginBottom(32)}
            {renderMarginBottom(32)}
            {renderMarginBottom(40)}
           </ScrollView>
        </View>
    );
};

export default ProfileScreen;
