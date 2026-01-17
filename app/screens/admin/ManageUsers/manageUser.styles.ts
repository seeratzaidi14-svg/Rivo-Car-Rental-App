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

    scrollContent:{
      paddingHorizontal: scale(10),
      paddingBottom: scale(100),
      gap: scale(12),
    },

    userCard:{
      backgroundColor: colors.carinfo,
      borderRadius: scale(8),
      padding: scale(12),
      borderColor: colors.border,
      borderWidth: 1, 
    },

    person: {
        height: scale(40),
        width: scale(40),
    },

    userRow:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(8),
    },

    userInfo:{
      marginLeft: scale(12),
      flex: 1,
    },

    userName:{
      fontWeight: 'bold',
      fontSize: FontSize.FONT_16Px,
      color: colors.black,
    },

    userEmail:{
      fontSize: FontSize.FONT_14Px,
      color: colors.bell,
    },

    statusDot:{
      width: scale(10),
      height: scale(10),
      borderRadius: scale(5),
      marginHorizontal: scale(4),
    },

    statusText:{
      fontSize: FontSize.FONT_14Px,
      color: colors.black,
      textTransform: 'lowercase',
    },

    buttonRow:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: scale(8),
    },

    blockButton:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.red,
      paddingVertical: scale(6),
      paddingHorizontal: scale(10),
      borderRadius: scale(6),
    },

    blockText:{
      color: colors.white,
      fontSize: FontSize.FONT_14Px,
    },

    deleteButton:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.button,
      paddingVertical: scale(6),
      paddingHorizontal: scale(10),
      borderRadius: scale(6),
    },

    deleteText:{
      color: colors.white,
      fontSize: FontSize.FONT_14Px,
    },

});