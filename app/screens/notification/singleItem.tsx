import React from 'react';
import {Pressable, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../theme/scale';
import {colors} from '../../theme/colors';
import {renderMarginBottom} from '../../utils/ui-utils';
import { createStyles } from './notification.styles';

interface ISingleItemProps { unRead: boolean; title: string; time: string; text:string; onPress:{} }

const SingleItem = ({unRead, title, time, text}: ISingleItemProps) => {
    const styles = createStyles(unRead);
    return(
        <Pressable style={styles.notificationContainer}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name='archive-cancel-outline' size={scale(24)} color={colors.bell}/>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{title}</Text>
                    <Text style={styles.notificationTime}>{time}{' '} {unRead && <View style={styles.badge}/>}</Text>
                </View>
                {renderMarginBottom(4)}
                <Text style={styles.notificationText} ellipsizeMode='tail' numberOfLines={2}>{text}</Text>
            </View>
        </Pressable>
    );
};

export default SingleItem;