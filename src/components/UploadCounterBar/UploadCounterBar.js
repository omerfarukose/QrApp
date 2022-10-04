import React from "react";
import { Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../values/Colors/Colors";

export const UploadCounterBar = ( props ) => {

  let { score } = props

  const _renderBarLine = ( index ) => {
    return(
      <View
        style={{
          height:hp(1),
          width:wp(17),
          backgroundColor: score >= index ? AppColors.green : AppColors.rose,
          borderRadius:10
        }}/>
    )
  }

  return (
    <View
      style={{
        width:wp(90),
        height:hp(10),
        backgroundColor:AppColors.gray,
        borderRadius:6,
        marginBottom:hp(10),
        alignItems:"center",
      }}>

      <Text
        style={{
          flex:1,
          fontSize:hp(3),
          fontWeight:"bold"
        }}>
        PAU QR Müdavim
      </Text>

      <View
        style={{
          flex:2,
          width:wp(70),
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"space-evenly"
        }}>
        { _renderBarLine(1) }
        { _renderBarLine(2) }
        { _renderBarLine(3) }
      </View>

    </View>
  );
};


