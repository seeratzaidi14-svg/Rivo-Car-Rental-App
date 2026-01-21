import { View, Text, Pressable } from "react-native";
import React from "react";
import { createStyles } from "./feature.styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../theme/colors";
import { scale } from "../../theme/scale";

type FeatureProps = {
    iconName: string;
    title: string;
    value: string;
};

const FeatureComponent = ({iconName, title, value}: FeatureProps) => {
    const styles = createStyles();
    return (
        <Pressable style={styles.featureContainer}>
         <Pressable style={styles.featureBorder}>
                <MaterialCommunityIcons name={iconName} color={colors.bell} size={scale(20)} />
         </Pressable>
         <View>
             <Text style={styles.featureTitle}>{title}</Text>
             <Text style={styles.featureInfo}>{value }</Text>
         </View>
       </Pressable>
    )
}

export default FeatureComponent;