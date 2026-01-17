import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { createStyles } from "./home.styles";
import assets from "../../assets";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CarComponent from "../../components/car/component";
import HeaderComponent from "../../components/header/component";
import SearchComponent from "../../components/search/component";
import CarBrandComponent from "../../components/carBrand/component";
import { useSearch } from "../search/search.hook";
import FilterView from "../search/view/filter.view";
import { navigate } from "../../navigators/navigation-utilities";
import CarActionView from "../search/view/carActions.view";
import { renderMarginBottom } from "../../utils/ui-utils";

const HomeScreen = () => {
    const styles = createStyles();
    const {tesla} = assets;
    const {showFilter, setShowFilter} = useSearch();

    return (
      <View style={styles.container}>
        <HeaderComponent title="Rivo"/>
          <View style={styles.main}>
             <SearchComponent onFilterPress={() => setShowFilter(!showFilter)}/>
             <View style={[styles.showCase, styles.p18]}>
                <Text style={styles.text}> Brands </Text>
                <FlatList showsHorizontalScrollIndicator={false} 
                  horizontal 
                  data={[1, 2, 3, 4, 5]} 
                  renderItem={({item}) => (<CarBrandComponent text="Tesla" />)}
                />
             </View>
             <ScrollView>
              <View style={[styles.showCaseCars, styles.p18]}>
                 <View style={styles.viewContainer}>
                    <Text style={styles.text}>Best Cars</Text>
                    <Text style={styles.viewAll}>View All</Text>
                 </View>
                 <View style={styles.flexRow}>
                     <CarComponent onPress={() => navigate('rootStack')}/>
                     <CarComponent onPress={() => navigate('rootStack')}/>
                 </View> 
                 <View style={styles.flexRow}>
                     <CarComponent onPress={() => navigate('rootStack')}/>
                     <CarComponent onPress={() => navigate('rootStack')}/>
                 </View>
                 <View style={styles.flexRow}>
                     <CarComponent onPress={() => navigate('rootStack')}/>
                     <CarComponent onPress={() => navigate('rootStack')}/>
                 </View>
                 <View style={styles.flexRow}>
                     <CarComponent onPress={() => navigate('rootStack')}/>
                     <CarComponent onPress={() => navigate('rootStack')}/>
                 </View>
             </View>
             </ScrollView>
             {renderMarginBottom(80)}
          </View>
      </View>
    );
};

export default HomeScreen; 
