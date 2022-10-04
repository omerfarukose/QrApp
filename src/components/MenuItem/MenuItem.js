import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { AppColors } from "../../values/Colors/Colors";
import Icon from 'react-native-vector-icons/Feather';

export const MenuItem = ({ title, navigateTo, icon }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigateTo)
      }}
      style={{
        height:hp(12),
        width:wp(90),
        marginBottom:hp(2),
        borderRadius:40,
        paddingLeft:wp(5),
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:AppColors.yellow,
      }}>

      <Icon name={icon} size={hp(4.5)} color={AppColors.black} />

      <Text
        style={{
          fontSize:hp(3),
          color:AppColors.black,
          fontWeight:"bold",
          marginLeft:hp(1),
        }}>

        { title }

      </Text>

    </TouchableOpacity>
  );
};

