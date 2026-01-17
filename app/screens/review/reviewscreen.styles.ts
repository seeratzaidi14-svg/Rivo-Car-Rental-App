import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import { scale } from '../../theme/scale';
import { FontSize } from '../../theme/font-size';
import { typography } from '../../theme/typography';

export const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    main: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopRightRadius: scale(30),
      borderTopLeftRadius: scale(30),
      paddingHorizontal: scale(18),
      justifyContent: 'space-between',
    },

    flatListContainer:{
        flex: 1,
        
    },

    reviewCard: {
        width: '100%',
        marginRight: 0,
        marginTop: scale(14),
    },

  });
