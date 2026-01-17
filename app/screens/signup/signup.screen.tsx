import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
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
                  onChangeText={e => console.log(e)}
                  placeholder={'Full Name'}
               />

                <InputComponent
                  onChangeText={e => console.log(e)}
                  placeholder={'Email Address'}
               />

               <InputComponent
                  isSecure
                  secureTextEntry={isSecure}
                  onChangeText={e => console.log(e)}
                  placeholder={'Password'}
                  onSecurePress={() => setIsSecure(!isSecure)}
               />

               <InputComponent
                  onChangeText={e => console.log(e)}
                  placeholder={'Country'}
               />
         </View>

         {renderMarginTop(12)}
         <View style={styles.buttonContainer}>
             <Button text="Sign Up" textStyles={styles.buttonText} />
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
