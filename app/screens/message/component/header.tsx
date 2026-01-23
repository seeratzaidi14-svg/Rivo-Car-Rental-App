import {Image, Text, View} from 'react-native';
import assets from '../../../assets';
import { createStyles } from '../message.styles';

export const HeaderAction = () => {
    const styles = createStyles();
    const {person} = assets;
    return(
        <View style={styles.headerAction}>
            <Image/>
        </View>
    );
};