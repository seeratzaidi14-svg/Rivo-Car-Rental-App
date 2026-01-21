import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { createStyles } from "./home.styles";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CarComponent from "../../components/car/component";
import HeaderComponent from "../../components/header/component";
import SearchComponent from "../../components/search/component";
import CarBrandComponent from "../../components/carBrand/component";
import { useSearch } from "../search/search.hook";
import { navigate } from "../../navigators/navigation-utilities";
import { renderMarginBottom } from "../../utils/ui-utils";
import { supabase } from "../../services/supabaseClient";
import { ICarComponentProps } from "../../components/car/ICar.props";
import assets from "../../assets";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
    const styles = createStyles();
    const isFocused = useIsFocused();
    const route = useRoute();
    const navigation = useNavigation();
    const {showFilter, setShowFilter} = useSearch();


    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [cars, setCars] = useState<ICarComponentProps[]>([]);

    useEffect(() => {
      const fetchCars = async () => {
         const {data,error} = await supabase.from("cars").select(`
    id,
    car_name,
    brand,
    location,
    price,
    image_url,
    rating,
    review_count,
    seats,
    fuel_type,
    transmission
  `);

         if(!error&&data) {
            const mappedCars = data.map((item) => ({
             id: item.id,
             name: item.car_name,
             brand: item.brand,
             location: item.location,
             pricePerDay: item.price,
             image_url: item.image_url,
             rating: item.rating,
             review_count: item.review_count,
             seats: item.seats,
             fuel_type: item.fuel_type,
             transmission: item.transmission,
            }));
            setCars(mappedCars);
         }
      };

      if (isFocused || (route.params as any)?.refresh) {
         fetchCars();
         if((route.params as any)?.refresh) {
            navigation.setParams({refresh: false} as any);
         }
      }
    }, [isFocused, (route.params as any)?.refresh]);

    const brandImages = {
      Toyota: assets.toyota,
      Audi: assets.audi,
      Hyundai: assets.hyundai,
      Kia: assets.kia,
      MG: assets.mg,
      BMW: assets.bmw,
      Ford: assets.ford,
      Merecdes: assets.mercedes,
      Other: assets.other,
    };

    type BrandName = keyof typeof brandImages;

    const getBrandImage = (brand: string) => {
      return brandImages[brand as BrandName] || brandImages.Other;
    };

    const knownBrands = Object.keys(brandImages);
    const uniqueBrands = [
      ...new Set(
         cars.map((car) => (knownBrands.includes(car.brand) ? car.brand : "Other"))
      ),
    ];

    const brandList = [...new Set(uniqueBrands)].sort();

    const filteredCars = selectedBrand 
     ? cars.filter((car) => car.brand === selectedBrand)
     : cars;

    return (
      <View style={styles.container}>
        <HeaderComponent title="Rivo"/>
          <View style={styles.main}>
             <SearchComponent onFilterPress={() => setShowFilter(!showFilter)}/>
             <View style={[styles.showCase, styles.p18]}>
                <Text style={styles.text}> Brands </Text>
                <FlatList showsHorizontalScrollIndicator={false} 
                  horizontal 
                  data={Object.keys(brandImages)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => 
                  <CarBrandComponent 
                   text={item}
                   image={getBrandImage(item)} 
                   onPress={() => {
                     if (selectedBrand === item) {
                        setSelectedBrand(null);
                     } else {
                        setSelectedBrand(item);
                     }
                   }}
                   isSelected={selectedBrand === item ? 1 : 0}
                   item={1}
                  />}
                />
             </View>
             <ScrollView>
              <View style={[styles.showCaseCars, styles.p18]}>
                 <View style={styles.viewContainer}>
                    <Text style={styles.text}>Rental Cars</Text>
                 </View>
                 {filteredCars.length === 0 ? (
                  <Text style={styles.text}>No cars available</Text>
                 ) : (
                  filteredCars.reduce((rows: any[], car, index) => {
                     if (index % 2 === 0) rows.push([]);
                     rows[rows.length - 1].push(car);
                     return rows;
                  }, []).map((row, index) => (
                     <View key={index} style={styles.flexRow}>
                        {row.map((car: any) => (
                           <CarComponent
                            key={car.id}
                            id={car.id}
                            name={car.name}
                            brand={car.brand}
                            image_url={car.image_url}
                            location={car.location}
                            rating={car.rating ?? 4.5}
                            seats={car.seats}
                            fuel_type={car.fuel_type}
                            transmission={car.transmission}
                            review_count={car.review_count}
                            pricePerDay={car.pricePerDay}
                            onPress={() => 
                              navigate('rootStack', {
                                 screen: 'CarDetailScreen',
                                 params: {car},
                              })
                            }
                           />
                        ))}
                     </View>
                  ))
                 )}
             </View>
             </ScrollView>
             {renderMarginBottom(80)}
          </View>
      </View>
    );
};

export default HomeScreen; 
