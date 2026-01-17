import { View, Text, Pressable } from "react-native";
import React from "react";
import { createStyles } from "./search.styles";
import InputComponent from "../input/component";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../theme/colors";
import { scale } from "../../theme/scale";
import { ISearchProps } from "./ISearch.props";

const SearchComponent = ({onFilterPress}:ISearchProps) =>{
    const styles = createStyles();
    return(
        <View style={[styles.flexRow, styles.p18]}>
                 <InputComponent onChangeText={e => console.log(e)} 
                    leftAction={<MaterialIcons name="search" size={scale(24)} color={colors.bell}/>} 
                    containerStyle={styles.inputContainer} 
                    placeholder="Search...."/>

                 <Pressable onPress={onFilterPress} style={[styles.borderRound, styles.wh]}>
                      <MaterialCommunityIcons name="filter-outline" size={scale(26)} color={colors.bell} />
                 </Pressable>
             </View> 
    );
};

export default SearchComponent;
