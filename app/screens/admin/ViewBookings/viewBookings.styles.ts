import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { scale } from '../../../theme/scale';
import { FontSize } from '../../../theme/font-size';
import { typography } from '../../../theme/typography';

export const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: scale(28),
    },
    scrollContent: {
      paddingBottom: scale(20),
    },
    searchWrapper: {
      marginHorizontal: scale(18),
      marginBottom: scale(12),
    },
    tabRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: scale(10),
    },
    tabButton: {
      paddingHorizontal: scale(12),
      paddingVertical: scale(6),
      borderRadius: scale(8),
      backgroundColor: colors.placeholder,
    },
    activeTabButton: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontFamily: typography.medium,
      fontSize: FontSize.FONT_13Px,
      color: colors.black,
    },
    activeTabText: {
      color: colors.white,
    },
    card: {
      backgroundColor: colors.background,
      marginHorizontal: scale(18),
      marginBottom: scale(12),
      padding: scale(12),
      borderRadius: scale(12),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cardTopRow: {
      flexDirection: 'row',
      marginBottom: scale(10),
    },
    imagePlaceholder: {
      height: scale(60),
      width: scale(60),
      borderRadius: scale(8),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageText: {
      color: colors.white,
      fontSize: FontSize.FONT_10Px,
      textAlign: 'center',
    },
    carInfo: {
      flex: 1,
      marginLeft: scale(10),
    },
    carTitle: {
      fontFamily: typography.bold,
      fontSize: FontSize.FONT_15Px,
      color: colors.black,
    },
    carLocation: {
      fontFamily: typography.medium,
      fontSize: FontSize.FONT_12Px,
      color: colors.placeholder,
    },
    specsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(6),
      marginTop: scale(4),
    },
    specsText: {
      fontFamily: typography.medium,
      fontSize: FontSize.FONT_11Px,
      color: colors.black,
    },
    dollarIcon: {
      marginLeft: scale(6),
    },
    editButton: {
      marginLeft: 'auto',
      borderWidth: 1,
      borderColor: colors.primary,
      paddingHorizontal: scale(8),
      paddingVertical: scale(2),
      borderRadius: scale(6),
    },
    editButtonText: {
      color: colors.primary,
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.medium,
    },
    cardBottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(6),
    },
    statusText: {
      fontFamily: typography.medium,
      fontSize: FontSize.FONT_12Px,
      color: colors.primary,
    },
    dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(6),
    },
    dateText: {
      fontFamily: typography.regular,
      fontSize: FontSize.FONT_12Px,
      color: colors.bgTab,
    },
    durationText: {
      fontFamily: typography.medium,
      fontSize: FontSize.FONT_12Px,
      color: colors.black,
    },
  });
