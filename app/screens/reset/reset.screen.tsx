import React from 'react';
import {Image, Text, View, Alert} from 'react-native';
import assets from '../../assets';
import {createStyles} from './reset.styles';
import {renderMarginBottom, renderMarginTop} from '../../utils/ui-utils';
import InputComponent from '../../components/input/component';
import Button from '../../components/button/component';
import {navigate} from '../../navigators/navigation-utilities';
import {supabase} from '../../services/supabaseClient';

const ResetScreen = () => {
  const styles = createStyles();
  const {logo_black} = assets;
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const handleResetPassword = async () => {
    if (!password) {
      Alert.alert('Error','Please enter your new password');
      return;
    }

    try {
      setLoading(true);
      const {error} = await supabase.auth.updateUser({password,});
      if (error) {
        Alert.alert('Error', error.message);
        return;
      }
      Alert.alert(
        'Success',
        'Your password has been reset successfully.',
        [{text: 'OK', onPress: () => navigate('SignInScreen'),},]
      );
    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.flexRow}>
          <Image source={logo_black} style={styles.carLogo} />
          <Text style={styles.titleStyle}>Rivo</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.textContainer}>
            <Text style={[styles.textStyle, styles.textCenter]}>
              Reset your password
            </Text>
            {renderMarginTop(12)}
            <Text style={styles.infoText}>
              Enter a new password for your account.
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <InputComponent
              secureTextEntry
              onChangeText={setPassword}
              placeholder={'New Password'}
            />
          </View>
          {renderMarginTop(28)}
          <Button
            onPress={handleResetPassword}
            text={loading ? 'Updating...' : 'Update Password'}
            textStyles={styles.buttonText}
          />
          {renderMarginTop(28)}
          <Text
            onPress={() => navigate('SignInScreen')}
            style={[styles.dontHaveText, styles.textCenter]}>
            Return to sign in
          </Text>
        </View>
      </View>
      <Text onPress={() => navigate('SignUpScreen')} style={[styles.dontHaveText, styles.textCenter]}>
        Create a New account{' '}
      </Text>
      {renderMarginBottom(32)}
    </View>
  );
};

export default ResetScreen;