import React from 'react';
import { View } from 'react-native';
import HeaderComponent from '../../components/header/component';
import { createStyles } from './favScreen.styles';
const FavCarScreen = () => {
  const styles = createStyles();
  return (
    <View style={styles.container}>
      <HeaderComponent title="Favourite Cars" hasBack />
    </View>
  );
};

export default FavCarScreen;
