import {StyleSheet} from 'react-native';
import { colors } from '../../theme/colors';
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

    scrollView:{
      padding: scale(16),
      paddingBottom: scale(80),
    },

    sectionTitle:{
      fontSize: FontSize.FONT_16Px,
      fontFamily: typography.semiBold,
      color: colors.black,
      marginBottom: scale(12),
    },

    imagePicker:{
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: 'dashed',
      borderRadius: scale(10),
      height: scale(50),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: scale(12),
    },

    imagePickerText:{
      fontSize: FontSize.FONT_14Px,
      color: colors.placeholder,
      fontFamily: typography.medium,
    },

    previewImage: {
      height: scale(180),
      borderRadius: scale(12),
      marginTop: scale(12),
    },

    addButton: {
      marginTop: scale(24),
    },

    dropDownList: {
      marginTop: 14,
      zIndex: 10,
    },

    dropDownList1: {
      marginTop: 14,
      zIndex: 9,
    },

    dropDownList2: {
      marginTop: 14,
      zIndex: 8,
    },

});
