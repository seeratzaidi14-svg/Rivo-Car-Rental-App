import { View, Text } from "react-native";
import React from "react";
import HeaderComponent from "../../components/header/component";
import { createStyles } from "./reviewscreen.styles";
import InputComponent from "../../components/input/component";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../theme/colors";
import { scale } from "../../theme/scale";
import Button from "../../components/button/component";
import { FlatList } from "react-native-gesture-handler";
import ReviewComponent from "../../components/review/component";
import { renderMarginTop } from "../../utils/ui-utils";

const   ReviewScreen = () => {
    const styles = createStyles();
    return (
        <View style={styles.container}>
            <HeaderComponent title="Reviews" hasBack/>
            <View style={styles.main}>
                <InputComponent 
                   onChangeText={e => console.log(e)}
                   leftAction={<MaterialIcons name="search" size={scale(24)} color={colors.bell}/>} 
                   placeholder="Find Reviews..."
                />
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={[1,2,3,4,5,6,7,8,9,10]}
                        showsVerticalScrollIndicator={false}
                        renderItem={() => <ReviewComponent fromReview containerStyle={styles.reviewCard}/>}
                    />
                </View>
                {renderMarginTop(8)}
                {/*<Button text="Book Now" />*/}
            </View>
        </View>    
    )
}

export default ReviewScreen;