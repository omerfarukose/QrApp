import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { MenuItem } from "../components/MenuItem/MenuItem";
import { AppColors } from "../values/Colors/Colors";
import { CustomNavbar } from "../components/Navbar/Navbar";
import { UploadCounterBar } from "../components/UploadCounterBar/UploadCounterBar";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const HomeScreen = ( ) => {

  let currentUser = auth().currentUser.email
  const userName = currentUser.substring(0, currentUser.indexOf('@'));
  const [uploadScore, setUploadScore] = useState(0);

  useEffect(() => {

    firestore()
      .collection('users')
      .doc(userName)
      .onSnapshot(documentSnapshot => {
        setUploadScore(documentSnapshot.data()?.uploadCounter)
      });

  }, []);


  return (
    <View
      style={{
        backgroundColor:AppColors.green,
        flex:1,
        alignItems:"center",
        padding:20,
        paddingTop:0
      }}>

      <CustomNavbar title={"PAU QR"} leftButtonType={'logOut'} />

      <UploadCounterBar score={uploadScore} />

      <MenuItem title={"Kare Kod Yükle"} navigateTo={"UploadCode"} icon={"upload"}/>

      <MenuItem title={"Kare Kod Al"} navigateTo={"GetCode"} icon={"download"} />

    </View>
  );
};
