import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import { scale } from '../../theme/scale';
import { FontSize } from '../../theme/font-size';
import { typography } from '../../theme/typography';

export const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: scale(28), 
    },

    main: { 
      flex: 1,
    },
    
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(15),
      paddingVertical: scale(12),
    },

    flex: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(2),
    },

    text: {
      fontSize: FontSize.FONT_16Px,
      color: colors.black,
      fontFamily: typography.bold,
    },

    textBold: {
      fontFamily: typography.semiBold,
    },

    showCase: {
      rowGap: scale(12),
      marginTop: scale(8),
    },

    p18: {
      paddingHorizontal: scale(18),
    },
    
    showCaseCars: {
      backgroundColor: colors.white,
      flex: 1,
      borderTopLeftRadius: scale(30),
      borderTopRightRadius: scale(30),
      marginTop: scale(24),
      paddingTop: scale(20),
    },

    viewAll: {
      color: colors.placeholder,
      fontSize: FontSize.FONT_12Px,
    },

    viewContainer: {
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'space-between',
    },

    dollarContainer: {
      borderColor: colors.bell,
      borderWidth: scale(1),
      height: scale(14),
      width: scale(14),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },

    priceContainer: {
      paddingVertical: scale(4),
      alignItems: 'center',
      columnGap: scale(8),
    },

    price: {
      fontSize: FontSize.FONT_11Px,
      color: colors.black,
    },

    buttonStyles:{
      paddingVertical: scale(7),
      paddingHorizontal: scale(7),
    },

    textStyles: {
      fontSize: FontSize.FONT_10Px,
      fontFamily: typography.semiBold,
    },

    filterView: {
      flex: 0.97,
      backgroundColor: colors.white,
      borderTopRightRadius: scale(15),
      borderTopLeftRadius: scale(15),
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scale(12),
      paddingHorizontal: scale(18),
      borderBottomColor: colors.btnBorder,
      borderBottomWidth: 0.5,
    },

    _f25: {
      flex: 0.08,
    },

    filterContainer: {
      paddingHorizontal: scale(18),
      flex: 1,
    },

    filterTypeText: {
      fontSize: FontSize.FONT_16Px,
      fontFamily: typography.semiBold,
    },

    slider: {
      width: '100%',
      height: scale(40),      
    },
    
    frob: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: scale(12),
    },

    inputContainer:{
      flex: 1,
    },

    tabContainerStyle: {
      borderWidth: 0,
    },

    tabStyle: {
      borderWidth: 1,
      borderColor: colors.btnBorder,
    },

    tabTextStyle: {
      color: colors.placeholder,
      fontFamily: typography.regular,
      fontSize: FontSize.FONT_12Px,
    },

    placeholder: {
      color: colors.placeholder,
    },

    clearAll:{
      color: colors.black,
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
    },

    btnTextStyle: {
      fontSize: FontSize.FONT_12Px,
    },

    btnContainerStyle: {
      paddingVertical: scale(10),
      paddingHorizontal: scale(12),
    },
});
