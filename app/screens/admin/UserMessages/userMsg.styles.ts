import {StyleSheet} from 'react-native';
import { colors } from '../../../theme/colors';
import { scale } from '../../../theme/scale';

export const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: scale(28), 
    },

    searchWrapper: {
      marginHorizontal: scale(18),
      marginTop: scale(12),
    },

    listContent: {
      paddingVertical: scale(10),
    },

});