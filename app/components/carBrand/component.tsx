
import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { createStyles } from "./carBrand.styles";
import assets from "../../assets";
import { ICarBrandProps } from "./ICarBrand.props";
import { renderMarginTop } from "../../utils/ui-utils";

const CarBrandComponent = ({text, isHorizontal = false, isSelected = 1, item}: ICarBrandProps) =>{
    const styles = createStyles(isHorizontal, isSelected === item);
    const {tesla} = assets;
    return(
     <Pressable style={styles.brandContainer}>
         <View style={styles.brand}> 
                <Image 
                    style={styles.brandImage} 
                    resizeMode="contain" 
                    source={tesla}
                />
         </View>
         {renderMarginTop(4)}
                <Text style={styles.brandText}>{text}</Text>
     </Pressable>
     
     
    );
};

export default CarBrandComponent;


