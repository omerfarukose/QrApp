import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import { AppColors } from "../../values/Colors/Colors";
import Icon from 'react-native-vector-icons/Feather';
import auth from "@react-native-firebase/auth";


export const CustomNavbar = ({ title, leftButton = true, leftButtonType = 'goBack' }) => {

  const navigation = useNavigation();

  const _handleLogOut = ( ) => {

    auth()
      .signOut()
      .then(() => {
        console.log("User sign out !");
        navigation.navigate("Login");
      });

  }

  return (
    <View
      style={{
        height:hp(13),
        width:wp(100),
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:hp(2),
        justifyContent:"space-between"
      }}>

      {
        leftButton ?
          <TouchableOpacity
            onPress={()=>{
              leftButtonType === "goBack" ? navigation.goBack() : _handleLogOut()
            }}>

            <Icon name={ leftButtonType === 'goBack' ? "chevron-left" : "log-out" } size={hp(4)} color={AppColors.black} />

          </TouchableOpacity>

          :

          <View style={{width:hp(4)}}/>

      }

      <Text
        style={{
          alignSelf:"center",
          fontSize:hp(3),
          color:AppColors.black,
          fontWeight:"bold"
        }}>

        { title }

      </Text>

      <View style={{width:hp(4)}}/>

    </View>
  );
};

