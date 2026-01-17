import { View, Text, ScrollView, Image, Pressable} from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/header/component';
import Button from '../../components/button/component';
import { createStyles } from './cardetail.styles';
import ImageSlider from '../../components/slider/component';
import { renderBorderBottom, renderMarginBottom, renderMarginTop } from '../../utils/ui-utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale } from '../../theme/scale';
import { colors } from '../../theme/colors';
import assets from '../../assets';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatureComponent from '../../components/feature/component';
import ReviewComponent from '../../components/review/component';
import { FlatList } from 'react-native-gesture-handler';
import { navigate } from '../../navigators/navigation-utilities';

const CarScreen = () => {
    const {person} = assets;
    const styles = createStyles();
    const data = [
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?_gl=1*mpdcu2*_ga*ODQ4NjE0NzkzLjE3NTc5MjI1NTI.*_ga_8JE65Q40S6*czE3NjUyNzgwODckbzMkZzEkdDE3NjUyNzg0NTAkajU5JGwwJGgw',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?_gl=1*mpdcu2*_ga*ODQ4NjE0NzkzLjE3NTc5MjI1NTI.*_ga_8JE65Q40S6*czE3NjUyNzgwODckbzMkZzEkdDE3NjUyNzg0NTAkajU5JGwwJGgw',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?_gl=1*mpdcu2*_ga*ODQ4NjE0NzkzLjE3NTc5MjI1NTI.*_ga_8JE65Q40S6*czE3NjUyNzgwODckbzMkZzEkdDE3NjUyNzg0NTAkajU5JGwwJGgw',
  ];
    return (
        <View style={styles.container}>
            <HeaderComponent title="Car Details" hasBack/>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.flex}>
                <ImageSlider images = {data} />
                {renderMarginTop(12)}
                <View style={styles.main}>
                    <View>
                         <View style={styles.titleContainer}>
                     <View style={styles.flex}>
                         <Text style={styles.title}>Tesla Model S</Text>
                         <Text style={styles.text}>A car with high specs that is rented at an affordable price</Text>
                      </View>
                      <View>
                         <View style={styles.reviewContainer}>
                             <Text style={styles.textBold}>5.0 <FontAwesome name="star" size={scale(18)} color={colors.star}/></Text>
                         </View>
                         <Text style={[styles.text, styles.f12]}>(100+ Reviews)</Text>
                       </View>
                    </View>
                    {renderMarginBottom(12)}
                    {renderBorderBottom(2)}
                    {renderMarginTop(18)}
                    <View style={styles.profile}>
                        <View style={styles.cg2}>
                          <Image source={person} style={styles.person}/>
                          <Text style={styles.ownerName}>John Doe</Text>
                        </View>
                        <View style={styles.cg2}>
                         <Pressable style={styles.iconBorder}>
                             <Feather name="phone" size={scale(22)} color={colors.bell} />
                         </Pressable>
                         <Pressable style={styles.iconBorder}>
                             <AntDesign name="message1" size={scale(20)} color={colors.bell}/>
                         </Pressable>
                        </View>
                    </View>
                    {renderMarginTop(18)}                 
                    <View>
                        <Text style={styles.title}>Car Features</Text>
                        {renderMarginTop(12)}
                        <View style={styles.cg2}>
                           <FeatureComponent/>
                           <FeatureComponent/>
                           <FeatureComponent/>
                        </View>
                        {renderMarginTop(12)}
                        <View style={styles.cg2}>
                           <FeatureComponent/>
                           <FeatureComponent/>
                           <FeatureComponent/>
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
            <Button onPress={() => navigate('BookingScreen')} text="Book Now" buttonStyles={styles.btn}/>
            {renderBorderBottom(10)}
        </View>
    )
}

export default CarScreen;