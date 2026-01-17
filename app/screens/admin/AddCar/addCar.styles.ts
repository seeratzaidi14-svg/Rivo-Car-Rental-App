import {StyleSheet} from 'react-native';
import { colors } from '../../../theme/colors';
import { scale } from '../../../theme/scale';
import { FontSize } from '../../../theme/font-size';

export const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: scale(28), 
    },

    scrollView:{
      padding: scale(16),
      paddingBottom: scale(80),
    },

    uploadedImage:{
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: scale(10),
    },

    imagePlaceholder:{
      height: scale(160),
      backgroundColor: colors.outlineButtonBg,
      borderRadius: scale(12),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scale(20),
    },

    imageText:{
      fontWeight: '500',
      marginBottom: scale(10),
      color: colors.white,
    },

    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#088F8F',
      paddingHorizontal: scale(12),
      paddingVertical: scale(6),
      borderRadius: scale(6),
    },

    uploadText: {
      color: colors.white,
      marginLeft: scale(6),
    },

    label: {
      marginBottom: scale(4),
      fontWeight: 'bold',
      color: colors.primary,
    },

    input: {
      backgroundColor: colors.placeholder,
      padding: scale(10),
      borderRadius: scale(8),
      marginBottom: scale(16),
      color: colors.white,
      fontSize: FontSize.FONT_12Px,
      fontWeight: 'bold',
    },

    dropdown: {
      backgroundColor: colors.bgTab,
      padding: scale(10),
      borderRadius: scale(8),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: scale(16),
    },

    dropdownText: {
      color: colors.white,
    },

    dropdownBox:{
      backgroundColor: colors.bell,
      borderColor: colors.border,
      borderRadius: scale(8),
      marginBottom: scale(16), 
      color: colors.white, 
      zIndex: 1000,
    },

    dropdownContainer:{
      backgroundColor: colors.bell,
      borderRadius: scale(8),
      borderColor: colors.border,
      color: colors.white,
    },

    dropDownText:{
      color: colors.white,
      fontSize: FontSize.FONT_12Px,
      fontWeight: 'bold',
    },

    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(24),
    },

    priceIcon: {
      backgroundColor: colors.star,
      padding: scale(10),
      borderTopLeftRadius: scale(8),
      borderBottomLeftRadius: scale(8),
    },

    priceInput: {
      flex: 1,
      backgroundColor: colors.bell,
      padding: scale(10),
      borderTopRightRadius: scale(8),
      borderBottomRightRadius: scale(8),
      color: colors.black,
    },

    submitButton: {
      backgroundColor: '#0077B6',
      paddingVertical: scale(12),
      borderRadius: scale(8),
      alignItems: 'center',
    },

    submitText: {
      color: colors.white,
      fontWeight: 'bold',
    },

});
