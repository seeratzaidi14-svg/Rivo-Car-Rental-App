import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
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
import { supabase } from "../../../services/supabaseClient";

const ProfileScreen = () => {
    const styles = createStyles();
    const {person} = assets;
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const {data: authData} = await supabase.auth.getUser();

            if (!authData?.user) return;

            const {data, error} = await supabase
             .from('users')
             .select('full_name')
             .eq('id', authData.user.id)
             .single();

            if (!error) {
                setUserData({
                    full_name: data.full_name,
                    email: authData.user.email,
                });
            }
        };

        fetchProfile();
    },[]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };
    return (
        <View style={styles.container}>
           <HeaderComponent title="Profile" hasBack />
           <ScrollView style={styles.main}>
            {renderMarginBottom(6)}
            <View style={styles.profileContainer}>
                <View style={styles.frcg}>
                    <Image source={person} style={styles.profileImage}/>
                    <View>
                        <Text style={styles.title}>{userData?.full_name ?? 'User'}</Text>
                        <Text style={styles.email}>{userData?.email ?? ''}</Text>
                    </View>
                </View>
            </View>
            {renderMarginBottom(12)}
            <Text style={styles.title}>General</Text>
            {renderMarginBottom(6)}
            <Pressable onPress={() => navigate('rootStack', {screen: 'PastBookingScreen'})}>
                <SingleList component={<MaterialCommunityIcons name="av-timer" size={scale(24)} color={colors.bell} />} text={"Previous Bookings"}/>
            </Pressable>
            <Pressable onPress={() => navigate('rootStack', {screen: 'AddCarScreen',})}>
                <SingleList component={<MaterialCommunityIcons name="car-multiple" size={scale(24)} color={colors.bell} />} text={"Add Car"}/>
            </Pressable>
            <Pressable onPress={handleLogout}>
                <SingleList component={<MaterialCommunityIcons name="logout" size={scale(24)} color={colors.bell} />} text={"Logout"}/>
            </Pressable>
            {renderMarginBottom(12)}
            {renderMarginBottom(32)}
            {renderMarginBottom(40)}
           </ScrollView>
        </View>
    );
};

export default ProfileScreen;
