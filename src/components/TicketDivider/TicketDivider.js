import React from "react";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { AppColors } from "../../values/Colors/Colors";

export const TicketDivider = () => {

  const _renderLine = ( ) => {
    return(
      <View style={{flexDirection:"row",width:wp(84),justifyContent:"space-evenly",alignItems:"center"}}>
        <Image source={require("../../assets/image/triple-lines.png")} style={{height:wp(1),width:wp(10),tintColor:AppColors.green}}  />
        <Image source={require("../../assets/image/triple-lines.png")} style={{height:wp(1),width:wp(15),tintColor:AppColors.green}}  />
        <Image source={require("../../assets/image/triple-lines.png")} style={{height:wp(1),width:wp(15),tintColor:AppColors.green}}  />
        <Image source={require("../../assets/image/triple-lines.png")} style={{height:wp(1),width:wp(15),tintColor:AppColors.green}}  />
        <Image source={require("../../assets/image/triple-lines.png")} style={{height:wp(1),width:wp(15),tintColor:AppColors.green}}  />
        <Image source={require("../../assets/image/triple-lines.png")} style={{height:wp(1),width:wp(15),tintColor:AppColors.green}}  />
        <Image source={require("../../assets/image/triple-lines.png")} style={{height:wp(1),width:wp(15),tintColor:AppColors.green}}  />
        <Image source={require("../../assets/image/triple-lines.png")} style={{height:wp(1),width:wp(15),tintColor:AppColors.green}}  />
      </View>
    )
  }

  return (
    <View
      style={{
        width:wp(90),
        backgroundColor:AppColors.white,
        flexDirection:"row",
        alignItems:"center"
      }}>

      <View
        style={{
          height:wp(6),
          width:wp(6),
          borderRadius:100,
          marginLeft:wp(-3),
          backgroundColor:AppColors.green
        }}/>

      { _renderLine() }

      <View
        style={{
          height:wp(6),
          width:wp(6),
          borderRadius:100,
          marginRight:wp(-3),
          backgroundColor:AppColors.green
        }}/>

    </View>
  );
};

