
import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { createStyles } from "./carBrand.styles";
import assets from "../../assets";
import { ICarBrandProps } from "./ICarBrand.props";
import { renderMarginTop } from "../../utils/ui-utils";

const CarBrandComponent = ({image, onPress, text, isHorizontal = false, isSelected = 0,}: ICarBrandProps) =>{
    const styles = createStyles(isHorizontal, isSelected === 1);
    const {tesla} = assets;

    return(
     <Pressable style={styles.brandContainer} onPress={() => onPress?.()}>
         <View style={styles.brand}> 
                <Image 
                    style={styles.brandImage} 
                    resizeMode="contain" 
                    source={image}
                />
         </View>
         {renderMarginTop(4)}
                <Text style={styles.brandText}>{text}</Text>
     </Pressable>
     
     
    );
};

export default CarBrandComponent;


