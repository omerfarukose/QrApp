import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AppColors } from "../../../values/Colors/Colors";
import { AppStrings } from "../../../values/Strings/Strings";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { CustomNavbar } from "../../../components/Navbar/Navbar";
import { CheckMail } from "../../../helper/functions/Functions";
import { Formik } from "formik";
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Feather';


export const SignUpScreen = ({ navigation }) => {

  const [showModal, setShowModal] = useState(true);
  const [modalType, setModalType] = useState("info");

  const _handleSubmit = ( values ) => {

    // check is email already exist

    Keyboard.dismiss();

    if(values.email && values.password){

      CheckMail(values.email)
        .then(() => {
          console.log("e mail is valid !");
          navigation.navigate("VerifyCode", { userValues: values})
        })
        .catch(() => {
          console.log("e mail is not valid");
          setModalType("alert")
          setShowModal(true)
        })

    }
    else{
      if(!values.email){
        console.log("e mail empty");
      }
      if(!values.password){
        console.log("password empty");
      }
    }

  }

  const _renderLogo = ( ) => {

    return(
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
    )
  }

  const _renderSignUpForm = ( ) => {
    return(
      <Formik
        initialValues={{ email: '',password: '' }}
        onSubmit={_handleSubmit}>

        {({ handleChange, handleBlur, handleSubmit, values }) => (

          <View
            style={{
              flex:3
            }}>

            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={AppStrings.eMailPau}
              style={{
                backgroundColor:AppColors.white,
                paddingLeft:wp(6),
                fontSize:hp(2.2),
                fontWeight:"bold",
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
                backgroundColor:AppColors.white,
                width:wp(40),
                height:hp(5),
                borderRadius:10,
                marginTop:hp(3),
                alignSelf:"center",
                alignItems:"center",
                elevation:3,
                justifyContent:"center" }}>

              <Text
                style={{
                  fontSize:hp(2.5),
                  color:AppColors.blue,
                  fontWeight:"bold"}}>

                { AppStrings.buttons.signUp }

              </Text>

            </TouchableOpacity>

          </View>

        )}

      </Formik>
    )
  }

  const _renderModalContent = () => {
    return(
      <View
        style={{
          flex:1,
        }}>

        <Text
          style={{
            color:AppColors.white,
            fontSize:hp(2.6),
            marginBottom:hp(1),
            fontWeight:"bold",
            textAlign:"center"
          }}>

          kullanıcı mailinde

        </Text>
        <Text
          style={{
            color:AppColors.white,
            marginBottom:hp(1),
            fontSize:hp(2.6),
            fontWeight:"bold",
            textAlign:"center"
          }}>

          @posta.pau.edu.tr

        </Text>
        <Text
          style={{
            color:AppColors.white,
            marginBottom:hp(1),
            fontSize:hp(2.6),
            fontWeight:"bold",
            textAlign:"center"
          }}>

          adresinizi kullanın

        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        flex:1,
        backgroundColor:AppColors.blue
      }}>

      <CustomNavbar />

      { _renderLogo() }

      { _renderSignUpForm() }

      <Modal
        isOpen={showModal}
        onClosed={() => setShowModal(false)}
        onOpened={() => {}}
        onClosingState={()=>{}}
        swipeArea={hp(23)}
        position={'center'}
        backdrop={true}
        backdropOpacity={0.1}
        style={{
          height:hp(40),
          width:wp(80),
          borderRadius:20,
          backgroundColor: modalType === "info" ? AppColors.emerald : AppColors.orange,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>

          <View
            style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Icon name={ modalType === "info" ? "info" : "alert-triangle" } size={hp(10)} color={AppColors.white} />
          </View>

          { _renderModalContent() }


      </Modal>

    </View>
  );
};
