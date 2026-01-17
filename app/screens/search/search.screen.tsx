import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { createStyles } from "./search.styles";
import HeaderComponent from "../../components/header/component";
import SearchComponent from "../../components/search/component";
import CarBrandComponent from "../../components/carBrand/component";
import CarComponent from "../../components/car/component";
import { ScrollView } from "react-native-gesture-handler";
import Fontisto from "react-native-vector-icons/Fontisto";
import { colors } from "../../theme/colors";
import { scale } from "../../theme/scale";
import CarActionView from "./view/carActions.view";
import { useSearch } from "./search.hook";
import FilterView from "./view/filter.view";
import { navigate } from "../../navigators/navigation-utilities";
import CarScreen from "../car/car.screen";
import { renderMarginBottom } from "../../utils/ui-utils";

const SearchScreen = () => {
    const styles = createStyles();
    const {showFilter, setShowFilter} = useSearch();
    return (
        <View style={styles.container}>
            <HeaderComponent title="Search" hasBack/>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <SearchComponent onFilterPress={() => setShowFilter(!showFilter)}/>
                <View style={[styles.showCase, styles.p18]}>
                <FlatList showsHorizontalScrollIndicator={false} 
                  showsVerticalScrollIndicator={false}
                  horizontal 
                  data={[1, 2, 3, 4, 5]} 
                  renderItem={({item}) => (<CarBrandComponent item={item} text="Tesla" isHorizontal isSelected={1}/>)}
                />
            </View>
            
            <View style={[styles.showCaseCars, styles.p18]}>
                 <View style={styles.viewContainer}>
                    <Text style={styles.text}>Recommended for you</Text>
                    <Text style={styles.viewAll}>View All</Text>
                 </View>
                 <View style={styles.flexRow}>
                     <CarComponent onPress={() => navigate('rootStack')} bottomActions={<CarActionView/>}/>
                     <CarComponent onPress={() => navigate('rootStack')} bottomActions={<CarActionView/>}/>
                 </View> 
                 <View style={styles.flexRow}>
                     <CarComponent onPress={() => navigate('rootStack')} bottomActions={<CarActionView/>}/>
                     <CarComponent onPress={() => navigate('rootStack')} bottomActions={<CarActionView/>}/>
                 </View>
                 <View style={styles.flexRow}>
                     <CarComponent onPress={() => navigate('rootStack')} bottomActions={<CarActionView/>}/>
                     <CarComponent onPress={() => navigate('rootStack')} bottomActions={<CarActionView/>}/>
                 </View> 
                 <View style={styles.flexRow}>
                     <CarComponent onPress={() => navigate('rootStack')} bottomActions={<CarActionView/>}/>
                     <CarComponent onPress={() => navigate('rootStack')} bottomActions={<CarActionView/>}/>
                 </View>
            </View>
               <FilterView visible={showFilter} setVisible={setShowFilter}/>
            </ScrollView>
            {renderMarginBottom(80)}
      </View>
    );
};

export default SearchScreen; 
