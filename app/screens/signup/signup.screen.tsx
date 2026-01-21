import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { supabase } from "../../services/supabaseClient";
import { createStyles } from "./signup.styles";
import { useSignup } from "./signup.hook";
import assets from "../../assets";
import InputComponent from "../../components/input/component";
import Button from "../../components/button/component";
import { navigate } from "../../navigators/navigation-utilities";
import { renderMarginTop } from "../../utils/ui-utils";

const SignUpScreen = () => {
    const styles = createStyles();
    const {isSecure, setIsSecure} = useSignup();
    const {logo_black} = assets; 
    const [fullName, setFullName] = React.useState('');
    const [city, setCity] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    
    const handleSignUp = async () => {
       if (!fullName || !email || !password || !city) {
            Alert.alert('Please fill all fields');
            return;
       }

       try {
        setLoading(true);
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert(error.message);
            return;
        }

        if (data?.user) {
            const {error: insertError} = await supabase
            .from('users')
            .insert([
                {
                    id: data.user.id,
                    full_name: fullName,
                    city: city,
                },
            ]);

            if (insertError) {
                Alert.alert('Error saving profile', insertError.message);
                return;
            }
        }
        Alert.alert('Account created successfully!');
        navigate('SignInScreen');
       } catch (err) {
        console.error(err);
        Alert.alert('Something went wrong');
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
                <Text style={styles.textCenter}>Sign Up</Text>
           </View>

           <View style={styles.inputContainer}>
               <InputComponent
                  onChangeText={setFullName}
                  placeholder={'Full Name'}
               />

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

               <InputComponent
                  onChangeText={setCity}
                  placeholder={'City'}
               />
         </View>

         {renderMarginTop(12)}
         <View style={styles.buttonContainer}>
             <Button text={loading ? 'Creating account...' : 'Sign Up'} onPress={handleSignUp} textStyles={styles.buttonText} />
         </View>

         <View style={styles.haveAccountContainer}>
                 <Text style={styles.dontHaveText}>
                   Already have an account? {'\t'}
                   <Text style={styles.dontHaveText} onPress={() =>  navigate('SignInScreen') }>Log In</Text>
                 </Text>
               </View>

        </ScrollView>
    );
};

export default SignUpScreen;
