import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import { scale } from '../../theme/scale';
import { FontSize } from '../../theme/font-size';
import { typography } from '../../theme/typography';

export const createStyles = () =>
  StyleSheet.create({ 
    card:{
        backgroundColor: colors.white,
        borderWidth: scale(1),
        borderColor: colors.border,
        borderRadius: scale(10),
        paddingHorizontal: scale(12),
        paddingVertical: scale(12),
        width: scale(240),
        marginRight: scale(18),
    },

    person:{
        width: scale(32),
        height: scale(32),
    },

    reviewTitle:{
        fontSize: FontSize.FONT_14Px,
        color: colors.black,
        fontFamily: typography.semiBold,
    },

    frsb: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    frcg:{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: scale(10),
    },

    reviewContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(4),
    },

    textBold:{
      fontFamily: typography.bold,
      fontSize: FontSize.FONT_14Px,
    },

    text:{
      fontSize: FontSize.FONT_12Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },

    dayText:{
      color: colors.placeholder,
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
    },

    dayContainer:{
      flex: 1,
      justifyContent: 'flex-end',
    },

    starsContainer:{
      flexDirection: 'row',
      columnGap: scale(3),
      alignItems: 'center',
      marginTop: scale(8),
      marginBottom: scale(8),
    },

  });
