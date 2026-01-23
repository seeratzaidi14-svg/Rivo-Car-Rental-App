import { View, Text, ScrollView, Image, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/header/component';
import Button from '../../components/button/component';
import { createStyles } from './cardetail.styles';
import ImageSlider from '../../components/slider/component';
import { renderBorderBottom, renderMarginBottom, renderMarginTop } from '../../utils/ui-utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale } from '../../theme/scale';
import { colors } from '../../theme/colors';
import assets from '../../assets';
import FeatureComponent from '../../components/feature/component';
import ReviewComponent from '../../components/review/component';
import { FlatList } from 'react-native-gesture-handler';
import { navigate } from '../../navigators/navigation-utilities';
import { supabase } from '../../services/supabaseClient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../../utils/useAuth';

const CarDetailScreen = ({route}: any) => {
  const {person} = assets;
  const {car} = route.params;
  const styles = createStyles();
  const {user} = useAuth();
    
  const [carData, setCarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*, users(full_name)')
        .eq('id', car.id) 
        .single();

      if (error) {
        console.error('Error fetching car:', error);
      } else {
        setCarData(data);
      }

      setLoading(false);
    };

    fetchCar();
  }, []);

  if (loading || !carData) {
    return (
      <View style={styles.container}>
        <HeaderComponent title="Car Details" hasBack />
        <Text style={{ padding: 20 }}>Loading...</Text>
      </View>
    );
  }

  const isOwner = user?.id === carData.user_id;

  const images = carData.image_url
    ? [carData.image_url]
    : ['https://placehold.co/400x250/png?text=Car'];

  const handleMessageOwner = async () => {
    if (!user?.id || !carData.user_id) return;

    const currentUserId = user.id;
    const ownerId = carData.user_id;

    const user1 = currentUserId < ownerId ? currentUserId : ownerId;
    const user2 = currentUserId < ownerId ? ownerId : currentUserId;

    const {data: existingConv, error} = await supabase
     .from('conversations')
     .select('*')
     .eq('user1_id', user1)
     .eq('user2_id', user2)
     .single();

     let conversationId = existingConv?.id;

     if (!conversationId) {
      const {data: newConv, error: createError} = await supabase
       .from('conversations')
       .insert({
        user1_id: user1,
        user2_id: user2,
       })
       .select()
       .single();

       if (createError) {
        console.error('Conversation create error:', createError.message);
        return;
       }

       conversationId = newConv.id;
     }

     navigate('rootStack', {
      screen: 'ChatScreen',
      params: {
        conversationId,
        otherUserIds: ownerId,
        name: carData.users?.full_name ?? 'User',
      },
     });
  };

    return (
        <View style={styles.container}>
            <HeaderComponent title="Car Details" hasBack/>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.flex}>
                <ImageSlider images = {images} />
                {renderMarginTop(12)}
                <View style={styles.main}>
                    <View>
                         <View style={styles.titleContainer}>
                     <View style={styles.flex}>
                         <Text style={styles.title}>{car.name}</Text>
                      </View>
                      <View>
                         <View style={styles.reviewContainer}>
                             <Text style={styles.textBold}>{(car.rating ?? 4.5).toFixed(1)}{' '}<FontAwesome name="star" size={scale(18)} color={colors.star}/></Text>
                         </View>
                         <Text style={[styles.text, styles.f12]}>({car.review_count ?? 0} Reviews)</Text>
                       </View>
                    </View>
                    {renderMarginBottom(12)}
                    {renderBorderBottom(2)}
                    {renderMarginTop(18)}
                    <View style={styles.profile}>
                        <View style={styles.cg2}>
                          <Image source={person} style={styles.person}/>
                          <Text style={styles.ownerName}>{carData.users?.full_name ?? 'Car Owner'}</Text>
                        </View>
                        <View style={styles.cg2}>
                         {!isOwner && (<Pressable style={styles.iconBorder} onPress={handleMessageOwner}>
                             <AntDesign name="message1" size={scale(20)} color={colors.bell}/>
                         </Pressable>)}
                        </View>
                    </View>
                    {renderMarginTop(18)}                 
                    <View>
                        <Text style={styles.title}>Car Features</Text>
                        {renderMarginTop(12)}
                        <View style={styles.cg2}>
                           <FeatureComponent iconName={'sofa-single-outline'} title={'Capacity'} value={car.seats != null ? `${car.seats} Seats` : 'N/A'}/>
                           <FeatureComponent iconName={'gas-station'} title={'Fuel Type'} value={car.fuel_type && car.fuel_type.trim() !== '' ? car.fuel_type : 'N/A'}/>
                           <FeatureComponent iconName={'car-shift-pattern'} title={'Transmission'} value={car.transmission && car.transmission.trim() !== '' ? car.transmission : 'N/A'}/>
                        </View>
                        {renderMarginTop(12)}
                        <View style={styles.cg2}>
                           <FeatureComponent iconName={'map-marker'} title={'Location'} value={carData.location ?? 'N/A'}/>
                           <FeatureComponent iconName={'currency-usd'} title={'Price per day'} value={car.pricePerDay ?? 'N/A'}/>
                        </View>
                    </View> 
                    {renderMarginTop(18)}
                    <View style={styles.profile}>
                        <Text style={styles.title}>Review (125)</Text>
                        <Text onPress={() => navigate('ReviewScreen')} style={styles.text}>View All</Text>
                    </View>
                    {renderMarginTop(12)}
                    <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={[1,2,3,4,5]}
                     renderItem={() => <ReviewComponent/>}
                    />
                </View>
                </View>
            </ScrollView>
            {!isOwner && (
              <Button onPress={() => navigate('BookingScreen', {car: carData})} text="Book Now" buttonStyles={styles.btn}/>
            )}
            {renderBorderBottom(10)}
        </View>
    )
}

export default CarDetailScreen;