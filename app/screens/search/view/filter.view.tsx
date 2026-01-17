import {View, Text, Pressable} from 'react-native'
import React, { useState } from 'react'
import { BottomSheet } from '../../../components/bottomSheet/BottomSheet';
import { IFilterProps } from '../ISearch.props';
import { createStyles } from '../search.styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../../../theme/scale';
import { colors } from '../../../theme/colors';
import { renderBorderBottom, renderMarginBottom, renderMarginTop } from '../../../utils/ui-utils';
import TabSwitcher from '../../../components/tabSwitcher/component';
import Slider from '@react-native-community/slider';
import InputComponent from '../../../components/input/component';
import { data, FuelType, rentalData, seatingCapacity } from './filter.data';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../components/button/component';
import DateComponent from '../../../components/date/component';

const FilterView = ({visible, setVisible}:IFilterProps) => {
    const [value, setValue] = useState(0)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const styles = createStyles()
    
    return (
        <BottomSheet visible={visible} setVisible={setVisible}>
            <View style = {styles.filterView}>
                <View style={styles.header}>
                    <Pressable>
                        <MaterialIcons name='close' size={scale(22)} color={colors.crossBg} onPress={() => setVisible(false)}/>
                    </Pressable>
                    <Text style={styles.text}>
                        Filters
                    </Text>
                    <View style={styles._f25}/>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.filterContainer}>
                    <TabSwitcher title= "Type of Cars" data={data} onPress={e => console.log(e) } />
                        {renderBorderBottom(10)}
                        {renderMarginBottom(16)}
                       <View style={styles.frob}>
                          <Text style={styles.filterTypeText}>Price Range</Text>
                          <Text style={styles.filterTypeText}>{value}$</Text>
                       </View>
                        <Slider style={styles.slider}
                          minimumValue={min}
                          maximumValue={max}
                          step={1}
                          minimumTrackTintColor= {colors.black}  
                          maximumTrackTintColor= {colors.black}  
                          thumbTintColor= {colors.darkBlue}
                          value={value}
                          onValueChange={e => setValue(e)}
                       />
                       <View style={styles.frob}>
                         <InputComponent keyboardType='numeric' placeholder='Min' containerStyle={styles.inputContainer} onChangeText={(e) => setMin(Number (e))}/>
                         <InputComponent keyboardType='numeric' placeholder='Max' containerStyle={styles.inputContainer} onChangeText={(e) => setMax(Number (e))} />
                       </View>
                       {renderMarginTop(16)}
                       {renderBorderBottom(10)}
                       {renderMarginBottom(16)}
                       <TabSwitcher 
                         title= "Rental Time" 
                         data={rentalData} 
                         onPress={e => console.log(e)}
                         tabContainerStyle= {styles.tabContainerStyle} 
                         tabStyle={styles.tabStyle}
                         tabTextStyle={styles.tabTextStyle}
                       />   
                       {renderMarginTop(8)}
                       <View style={styles.frob}>
                         <Text style={styles.placeholder}>Pickup and Dropdate</Text>
                         <Text onPress={() => setShowDatePicker(true)} style={styles.placeholder}>14 June 2025</Text>
                         <DateComponent visible={showDatePicker} setVisible={setShowDatePicker}/>
                       </View>
                       <InputComponent keyboardType='numeric' placeholder='Car Location'  onChangeText={(e) => setMax(Number (e))} />
                       {renderMarginTop(16)}
                       {renderBorderBottom(10)}
                       {renderMarginBottom(16)}
                       <TabSwitcher 
                         title= "Seating Capacity" 
                         data={seatingCapacity} 
                         onPress={e => console.log(e)}
                         tabContainerStyle= {styles.tabContainerStyle} 
                         tabStyle={styles.tabStyle}
                         tabTextStyle={styles.tabTextStyle}
                       />  
                       <TabSwitcher 
                         title= "Fuel Type" 
                         data={FuelType} 
                         onPress={e => console.log(e)}
                         tabContainerStyle= {styles.tabContainerStyle} 
                         tabStyle={styles.tabStyle}
                         tabTextStyle={styles.tabTextStyle}
                       /> 
                       {renderBorderBottom(10)}
                       {renderMarginBottom(16)}
                       <View style={styles.frob}>
                         <Text style={styles.clearAll}>Clear All</Text>
                         <Button text='Show 100+ Cars' textStyles={styles.btnTextStyle} buttonStyles={styles.btnContainerStyle}/>
                       </View>
                       {renderMarginBottom(16)}
                  </View>
                </ScrollView>
            </View>
        </BottomSheet>
    )
}

export default FilterView;
