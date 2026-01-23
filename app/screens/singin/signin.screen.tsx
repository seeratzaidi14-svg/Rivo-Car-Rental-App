import React from 'react';
import {Image, ScrollView, Text, View, Alert} from 'react-native';
import assets from '../../assets';
import Button from '../../components/button/component';
import CheckBoxComponent from '../../components/checkbox/component';
import InputComponent from '../../components/input/component';
import {createStyles} from './signin.styles';
import {useSignin} from './signin.hook';
import {navigate} from '../../navigators/navigation-utilities';
import { supabase } from "../../services/supabaseClient";

const SignInScreen = () => {
  const styles = createStyles();
  const {isSecure, setIsSecure} = useSignin();
  const {logo_black} = assets;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login failed', error.message);
        return;
      }

      Alert.alert('Success', 'Logged in successfully');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexRow}>
        <Image source={logo_black} style={styles.carLogo} />
        <Text style={styles.titleStyle}>Rivo</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Welcome Back</Text>
        <Text style={styles.textStyle}>Ready to hit the road?</Text>
      </View>

      <View style={styles.inputContainer}>
        <InputComponent
          onChangeText={setEmail}
          placeholder={'Email Address'}
        />

        <InputComponent
          isSecure
          secureTextEntry={isSecure}
          onChangeText={setPassword}
          placeholder={'Password'}
          onSecurePress={() => setIsSecure(!isSecure)}
        />
      </View>

      <View style={[styles.colG2]}>
        <View style={styles.flexRow}>
          <CheckBoxComponent
            onPress={e => {
              console.log('item', e);
            }}
            isChecked={false}
          />
          <Text style={styles.textRemember}>Remember Me</Text>
        </View>
          <Text style={styles.textRemember} onPress={() =>  navigate('ResetScreen') }>Forgot Password</Text>
       </View>

      <View style={styles.buttonContainer}>
        <Button 
           text={loading ? 'Logging in...' : 'Login'}
           onPress={handleLogin}
           textStyles={styles.buttonText}/>
      </View>

      <View style={styles.haveAccountContainer}>
        <Text style={styles.dontHaveText}>
          Don't have an account ? {'\t'}
          <Text style={styles.dontHaveText} onPress={() =>  navigate('SignUpScreen') }>Sign Up</Text>
        </Text>
      </View>

    </ScrollView>
  );
};

export default SignInScreen;
