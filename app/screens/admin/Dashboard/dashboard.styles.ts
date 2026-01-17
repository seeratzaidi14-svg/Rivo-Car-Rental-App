import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { scale } from '../../../theme/scale';


export const createStyles = () =>
StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: scale(25), 
  },

  main: {
      paddingHorizontal: scale(16),
      paddingBottom: scale(80),
    },

    gridRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: scale(16),
    },

    fullWidthButton: {
      alignItems: 'center',
      marginBottom: scale(20),
    },

    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#1E1E2D',
      paddingVertical: scale(12),
      borderTopLeftRadius: scale(24),
      borderTopRightRadius: scale(24),
      borderBottomLeftRadius: scale(24),
      borderBottomRightRadius: scale(24),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });