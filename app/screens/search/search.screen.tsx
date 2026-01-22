import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { createStyles } from "./search.styles";
import HeaderComponent from "../../components/header/component";
import SearchComponent from "../../components/search/component";
import CarBrandComponent from "../../components/carBrand/component";
import CarComponent from "../../components/car/component";
import { ScrollView } from "react-native-gesture-handler";
import CarActionView from "./view/carActions.view";
import { useSearch } from "./search.hook";
import FilterView from "./view/filter.view";
import { navigate } from "../../navigators/navigation-utilities";
import { renderMarginBottom } from "../../utils/ui-utils";
import { supabase } from "../../services/supabaseClient";
import { useNavigation } from "@react-navigation/native";

const brandList = ['Toyota', 'Kia', 'BMW', 'MG', 'Mercedes', 'Hyundai', 'Audi', 'Ford', 'Other'];

const SearchScreen = () => {
    const styles = createStyles();
    const {showFilter, setShowFilter} = useSearch();
    const navigation = useNavigation();

    const [selectedBrand, setSelectedBrand] = useState<string>('Toyota');
    const [cars, setCars] = useState<any[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            const {data,error} = await supabase
            .from('cars')
            .select('*')
            .ilike('brand', `%${selectedBrand}%`);

            if (error) console.log('Error fetching cars:', error);
            else setCars(data || []);
        };
        fetchCars();
    }, [selectedBrand]);

    const renderCarsInRows = () => {
        const rows = [];
        for ( let i = 0; i < cars.length; i+= 2) {
            rows.push(
                <View style={styles.flexRow} key={`row-${i}`}>
                    <CarComponent
                        name={cars[i].car_name}
                        location={cars[i].location}
                        image_url={cars[i].image_url}
                        rating={cars[i].rating}
                        seats={cars[i].seats}
                        pricePerDay={cars[i].price}
                        brand={cars[i].brand}
                        onPress={() => navigate('rootStack', {screen: 'CarDetailScreen', params: {car: cars[i]},})}
                        bottomActions={<CarActionView />} review_count={0} fuel_type={""} transmission={""}/>
                    {cars[i + 1] && (
                        <CarComponent
                            name={cars[i + 1].car_name}
                            location={cars[i + 1].location}
                            image_url={cars[i + 1].image_url}
                            rating={cars[i + 1].rating}
                            seats={cars[i + 1].seats}
                            pricePerDay={cars[i + 1].price}
                            brand={cars[i + 1].brand}
                            onPress={() => navigate('rootStack', {screen: 'CarDetailScreen', params: {car: cars[i+1]},})}
                            bottomActions={<CarActionView />} review_count={0} fuel_type={""} transmission={""}/>
                    )}
                </View>
            );
        }
        return rows;
    };
    return (
        <View style={styles.container}>
            <HeaderComponent title="Search" hasBack/>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <SearchComponent onFilterPress={() => setShowFilter(!showFilter)}/>

                    <View style={[styles.showCase, styles.p18]}>
                        <FlatList
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          data={brandList}
                          keyExtractor={(item) => item}
                          renderItem={({item}) => (
                            <CarBrandComponent
                               text={item}
                               isHorizontal
                               isSelected={selectedBrand === item ? 1 : 0}
                               onPress={() => setSelectedBrand(item)}
                            />
                          )}
                        />
                    </View>

                    <View style={[styles.showCaseCars, styles.p18]}>
                        <View style={styles.viewContainer}>
                            <Text style={styles.text}>Recommended for you</Text>
                        </View>
                        {renderCarsInRows()}
                    </View>

                    <FilterView visible={showFilter} setVisible={setShowFilter}/>
            </ScrollView>
            {renderMarginBottom(80)}
        </View>
    );
};

export default SearchScreen; 
