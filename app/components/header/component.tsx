import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import assets from "../../assets";
import Octicons from "react-native-vector-icons/Octicons";
import { scale } from "../../theme/scale";
import { colors } from "../../theme/colors";
import { createStyles } from "./header.styles";
import { IHeaderProps } from "./IHeader.props";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { goBack, navigate } from "../../navigators/navigation-utilities";

const HeaderComponent = ({title, hasBack = false, actionComponent}: IHeaderProps) =>{
    const styles = createStyles();
    const {logo_black, person} = assets;
    return(
        <View style={styles.header}>
              <View style={styles.flexRow}>
                 {hasBack ? (
                  <Pressable onPress={goBack} style={styles.borderRound}>
                     <MaterialIcons name="chevron-left" size={scale(28)} color={colors.black}/>
                  </Pressable>
                 ) : (
                  <React.Fragment>
                    <Image source={logo_black} style={styles.carLogo}/>
                    <Text style={styles.titleStyle}>{title}</Text>
                  </React.Fragment>
                 )}
                 {actionComponent}
              </View>
              {hasBack && title && <Text style={[styles.titleStyle, styles.t20]}>{title}</Text>}
              <View style={styles.flexRow}>
                {hasBack ? (
                    <Pressable style={styles.borderRound}>
                         <MaterialCommunityIcons name="dots-horizontal" size={scale(28)} color={colors.black}/>
                    </Pressable>
                ): (
                  <React.Fragment>
                      <Pressable style={styles.borderRound} onPress={() => navigate('NotificationScreen')}>
                            <Octicons name= "bell" size={scale(24)} color={colors.bell}/>
                      </Pressable>

                      <Pressable style={styles.borderRound} onPress={() => navigate('ProfileScreen')}>
                          <Image source={person} style={styles.person}/>
                      </Pressable>
                  </React.Fragment>
                )}
              </View>

          </View>
    );
};

export default HeaderComponent;
