import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { createStyles } from './userMsg.styles';
import HeaderComponent from '../../../components/header/component';
import InputComponent from '../../../components/input/component';
import { scale } from '../../../theme/scale';
import { colors } from '../../../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import SingleItem from '../../message/component/singleItem';
import { navigate } from '../../../navigators/navigation-utilities';
const UserMessages = () => {
  const styles = createStyles();
  return (
    <View style={styles.container}>
      <HeaderComponent title="User Messages" hasBack />
      <View style={styles.searchWrapper}>
        <InputComponent placeholder="Search messages..." leftAction={<MaterialIcons name="search" size={scale(22)} color={colors.bell}/>}
        onChangeText={(text) => console.log(text)} />
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        data={[1,2,3,4,5]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
            <SingleItem  onPress={() => navigate('AdminStack', {screen: 'AdminChatScreen'})}
               name="John Doe"
               message="Thank you for answering my questions."
               time="2 hrs ago"
               badge={0}
               isHighlighted={true}/>
          )}/>
    </View>
  );
};

export default UserMessages;