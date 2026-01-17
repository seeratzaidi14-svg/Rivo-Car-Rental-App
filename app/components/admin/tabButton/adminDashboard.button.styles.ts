import { StyleSheet } from 'react-native';
import { scale } from '../../../theme/scale';
import { typography } from '../../../theme/typography';
import { FontSize } from '../../../theme/font-size';
import { colors } from '../../../theme/colors';

export const createStyles = (active: boolean) =>
StyleSheet.create({
  button:{
    backgroundColor: '#0c0c38ff',
    borderRadius: scale(16),
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
    width: '47%',
    alignItems: 'center',
  },

  full :{
    width: '100%',
  },

  icon: {
    marginBottom: scale(8),
  },

  label: {
    color: colors.white,
    fontFamily: typography.semiBold,
    fontSize: FontSize.FONT_13Px,
  },
  
});