import React from 'react';
import {FlatList, View} from 'react-native';
import HeaderComponent from '../../../components/header/component';
import {HeaderAction} from '../component/header';
import {createStyles} from './chat.styles';
import InputComponent from '../../../components/input/component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../theme/colors';
import {scale} from '../../../theme/scale';
import ChatCard from '../../../components/chatCard/component';


const ChatScreen = () => {
    const styles = createStyles();
    return (
          <View style={styles.container}>
              <HeaderComponent hasBack actionComponent={<HeaderAction />} title={''} />
              <View style={styles.main}>
                <FlatList showsVerticalScrollIndicator={false} inverted renderItem={({item}) => (<ChatCard message = {item.message} time = {item.time} isSelf = {item.isSelf}/>)} 
                 data = {[
                    {
                        isSelf: false,
                        message: 'Very good.',
                        time: '10:00 AM',
                    },
                    {
                        isSelf: true,
                        message: 'yes I am fine, thank you.',
                        time: '9:00 AM',
                    },
                    {
                        isSelf: false,
                        message: 'Hello, How are you?',
                        time: '8:00 AM',
                    },
                    {
                        isSelf: true,
                        message: 'Good Morning!',
                        time: '7:00 AM',
                    }, ]}/>
                    <View style={styles.sendMessageContainer}>
                        <InputComponent containerStyle={styles.sendInput} onChangeText={e => console.log(e)} placeholder='Send a message...'/>
                        <MaterialIcons onPress={() => console.log('send')} name='send' color={colors.black} size={scale(24)}/>
                    </View>
              </View>
         </View>
    );
};

export default ChatScreen;