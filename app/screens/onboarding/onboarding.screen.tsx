import React, { useEffect } from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import assets from '../../assets';
import Button from '../../components/button/component';
import {createStyles} from './onboarding.styles';
import {navigate} from '../../navigators/navigation-utilities';
import { useAuth } from '../../utils/useAuth';

const OnBoardingScreen = () => {
  const styles = createStyles();
  const {logo, overlayBg, whiteCar} = assets;

  const {user} = useAuth();

  useEffect(() => {
    if (user) {
      navigate('tabStack');
    }
  }, [user]);
  
  return (
    <ImageBackground
      resizeMode="cover"
      source={whiteCar}
      style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={overlayBg}
        style={styles.overLay}>
        <View>
          <View style={styles.logoContainer}>
            <Image resizeMode="contain" source={logo} style={styles.carLogo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.title}>Rivo</Text>
          </View>
        </View>
        <Button
          onPress={() => navigate('OnBoardingScreenTwo')}
          text="Get Started"
          buttonStyles={styles.buttonStyle}
          textStyles={styles.buttonText}
        />
      </ImageBackground>
    </ImageBackground>
  );
};

export default OnBoardingScreen;
