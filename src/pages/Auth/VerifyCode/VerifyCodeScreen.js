import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback, Keyboard} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { AppColors } from "../../../values/Colors/Colors";
import { AppStrings } from "../../../values/Strings/Strings";
import { CustomNavbar } from "../../../components/Navbar/Navbar";
import { CreateUser } from "../../../helper/functions/Functions";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Modal from 'react-native-modalbox';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';

export const VerifyCodeScreen = ( props ) => {

  let { userValues } = props.route.params;
  const navigation = useNavigation();

  console.log("User values : ",userValues);

  const [verifyCodeText, setVerifyCodeText] = useState("");
  const [verificationCode, setVerificationCode] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("warning");
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    _getVerificationCode()
  }, []);


  const _getVerificationCode = ( ) => {
    console.log(Math.floor(100000 + Math.random() * 900000));
    setVerificationCode("123456")
  }

  const _handleVerify = ( ) => {
    console.log("Verify button clicked !");

    if(verifyCodeText === verificationCode){
      CreateUser(userValues.email, userValues.password)
        .then(() => {
          setModalType("success")
          console.log("User created ! ",userValues.email);
        })
    }

  }

  const _renderHeaderText = ( ) => {
    return(
      <View
        style={{
          padding:hp(3)
        }}>

        <Text
          style={{
            fontSize:hp(5),
            fontWeight:"bold",
            color:AppColors.white
          }}>

          { AppStrings.verificationCode }

        </Text>

        <Text
          style={{
            fontSize:hp(2.5),
            fontWeight:"bold",
            color:AppColors.white
          }}>

          { AppStrings.verifyCodeText }

        </Text>

      </View>
    )
  }

  const _renderVerifyButton = ( ) => {
    return(
      <TouchableOpacity
        onPress={_handleVerify}
        disabled={verifyCodeText.length !== 6}
        style={{
          backgroundColor:AppColors.gray,
          width:wp(30),
          height:hp(8),
          borderRadius:10,
          alignSelf:"center",
          marginTop:hp(10),
          alignItems:"center",
          justifyContent:"center",
          elevation:10
        }}>

        <Text
          style={{
            color:verifyCodeText.length !== 6 ? AppColors.crayola : AppColors.orange,
            fontSize:hp(2.5),
            fontWeight:"bold"
          }}>

          { AppStrings.buttons.verify }

        </Text>

      </TouchableOpacity>
    )
  }

  return (
      <View
        style={{
          flex:1,
          backgroundColor:AppColors.orange,
        }}>

        <CustomNavbar leftButton={true} />

        { _renderHeaderText() }

        <OTPInputView
          style={{width: wp(80), height: hp(20),alignSelf:"center"}}
          pinCount={6}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          selectionColor={AppColors.crayola}
          onCodeFilled = {code => setVerifyCodeText(code)}
        />

        <View
          style={{
            width:wp(100),
            alignItems:"center",
          }}>

          <CountdownCircleTimer
            key={timerKey}
            isPlaying
            size={100}
            duration={10}
            colors={['#eceff1','#a41623']}
            colorsTime={[10,0]}
            trailColor={AppColors.orange}
            onComplete={() => setShowModal(true)}>

            {({ remainingTime }) => <Text style={{color:AppColors.white,fontWeight:"bold",fontSize:hp(2.6)}}>{remainingTime}</Text>}

          </CountdownCircleTimer>

        </View>

        { _renderVerifyButton() }

        <Modal
          isOpen={showModal}
          onClosed={() => setShowModal(false)}
          swipeArea={hp(23)}
          position={'center'}
          backdrop={true}
          backdropOpacity={0.1}
          style={{
            height:hp(40),
            width:wp(80),
            borderRadius:20,
            backgroundColor: AppColors.emerald,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>

          <View
            style={{alignItems:"center",justifyContent:"center"}}>
            <Icon name={ modalType === "warning" ? "alert-triangle" : "check" } size={hp(10)} color={AppColors.white} />
          </View>

          <Text
            style={{
              color:AppColors.white,
              fontSize:hp(4),
              fontWeight:"bold"
            }}>
            { modalType === "warning" ? "Timer finished !" : "User created !"}
          </Text>

          <TouchableOpacity
            onPress={() => {
              if ( modalType === "warning" ) {
                setShowModal(false)
                setTimerKey(timerKey + 1)
              }
              else{
                setShowModal(false);
                navigation.navigate("Login")
              }

            }}
            style={{
              backgroundColor:AppColors.white,
              padding:hp(2),
              borderRadius:10
            }}>
            <Text
              style={{
                color:AppColors.green,
                fontSize:hp(3),
                fontWeight:"bold"
              }}>
              { modalType === "warning" ? "Send again" : "Tamam"}
            </Text>
          </TouchableOpacity>
        </Modal>

      </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
