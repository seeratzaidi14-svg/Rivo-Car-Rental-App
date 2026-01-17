import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import { scale } from '../../theme/scale';

export const createStyles = () =>
  StyleSheet.create({

    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(14),
      paddingVertical: scale(12),
      backgroundColor: colors.background,
    }, 

    borderRound: {
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(40),
        width: scale(40),
        borderRadius: scale(100),
    },

     wh: {
        backgroundColor: colors.white,
    },
    
    p18: {
        paddingHorizontal: scale(18),
    },

    inputContainer: {
        flex: 1, 
        marginTop: 0, 
        height: scale(45), 
        paddingVertical: 0,
    },



  });
