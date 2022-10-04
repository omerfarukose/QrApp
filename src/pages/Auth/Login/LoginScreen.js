import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from 'formik';
import { AppColors } from "../../../values/Colors/Colors";
import { AppStrings } from "../../../values/Strings/Strings";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { UserLogin } from "../../../helper/functions/Functions";


export const LoginScreen = ({ navigation }) => {

  const _handleLogin = ( values ) => {

    UserLogin(values.email, values.password)
      .then(() => {
        navigation.navigate("Home")
      })
      .catch((e) => {
        console.log("user login error : ",e);
      })

  }

  const _renderLoginForm = ( ) => {

    return(
      <Formik
        initialValues={{ email: '',password: '' }}
        onSubmit={_handleLogin}>

        {({ handleChange, handleBlur, handleSubmit, values }) => (

          <View
            style={{
              flex:2
            }}>

            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={AppStrings.email}
              style={{
                backgroundColor:AppColors.white,
                paddingLeft:wp(6),
                fontSize:hp(2.2),
                fontWeight:"bold",
                height:hp(8),
                margin:20,
                borderRadius:20
              }}/>

            <TextInput
              textContentType={"password"}
              secureTextEntry={true}
              placeholder={AppStrings.password}
              style={{
                backgroundColor:AppColors.white,
                margin:20,
                paddingLeft:wp(6),
                height:hp(8),
                fontSize:hp(2.2),
                fontWeight:"bold",
                borderRadius:20
              }}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}/>

            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor:AppColors.blue,
                width:wp(40),
                height:hp(5),
                borderRadius:10,
                marginTop:hp(3),
                alignSelf:"center",
                elevation:3,
                alignItems:"center",
                justifyContent:"center" }}>

              <Text
                style={{
                  fontSize:hp(3),
                  color:AppColors.white,
                  fontWeight:"bold"}}>

                { AppStrings.buttons.login }

              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={{
                alignItems:"center",
                marginTop:hp(5),
                justifyContent:"center",
                flexDirection:"row"
              }}>

              <Text
                style={{
                  color:AppColors.white,
                  marginRight:hp(1)
                }}>

                { AppStrings.signTitle }

              </Text>

              <Text
                style={{
                  color:AppColors.white,
                  fontSize:hp(2),
                  fontWeight:"bold"
                }}>

                { AppStrings.signUp }

              </Text>

            </TouchableOpacity>

          </View>

        )}

      </Formik>
    )
  }

  return (
    <View
      style={{
        flex:1,
        backgroundColor:AppColors.green
      }}>

      <View
        style={{
          flex:1,
          justifyContent:"center",
          alignItems:"center"
        }}>
        <Image
          source={require("../../../assets/image/app-logo.png")}
          style={{
            width:wp(60),
            height:hp(10),
            alignSelf:"center"}}/>
      </View>

      { _renderLoginForm() }

    </View>
  );
};
