import {StyleSheet} from 'react-native';
import { colors } from '../../../theme/colors';
import { scale } from '../../../theme/scale';
import { typography } from '../../../theme/typography';
import { FontSize } from '../../../theme/font-size';

export const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: scale(28), 
    },

    scrollContent: {
        paddingBottom: scale(0),
        paddingTop: scale(12),
        paddingHorizontal: scale(16),
    },

    card:{
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: scale(12),
        padding: scale(12),
        marginBottom: scale(12),
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 1,
    },

    carImagePlaceholder:{
        width: scale(80),
        height: scale(80),
        borderRadius: scale(8),
        backgroundColor: colors.bell,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(12),
    },

    imageText:{
        fontSize: FontSize.FONT_9Px,
        color: colors.white,
        textAlign: 'center',
    },

    carInfo:{
        flex: 1,
    },

    carTitle:{
        fontSize: FontSize.FONT_14Px,
        fontWeight: 'bold',
        marginBottom: scale(2),
    },

    carLocation:{
        fontSize: FontSize.FONT_12Px,
        color: colors.bell,
        marginBottom: scale(4),
    },

    specsRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(6),
        marginTop: scale(4),
    },

    specsText:{
        fontSize: FontSize.FONT_12Px,
        color: colors.visaCard.gray2,
    },

    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: scale(8),
    },

    editButton:{
        backgroundColor: '#2d70d6',
        paddingVertical: scale(4),
        paddingHorizontal: scale(12),
        borderRadius: scale(6),
    },

    deleteButton:{
        backgroundColor: '#e84848',
        paddingVertical: scale(4),
        paddingHorizontal: scale(12),
        borderRadius: scale(6),
    },

    buttonText:{
        color: colors.white,
        fontSize: FontSize.FONT_12Px,
    },

});
