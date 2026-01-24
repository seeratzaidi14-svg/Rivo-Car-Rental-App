import { StyleSheet } from 'react-native';
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

    main: {
      paddingHorizontal: scale(18),
      paddingTop: scale(12),
    },

    row: {
      flexDirection: 'row',
      columnGap: scale(12),
      marginBottom: scale(12),
    },

    emptyText: {
      textAlign: 'center',
      marginTop: scale(40),
      fontSize: FontSize.FONT_14Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },
  });
