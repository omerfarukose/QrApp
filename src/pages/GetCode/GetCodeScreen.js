import React, { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { AppColors } from "../../values/Colors/Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TicketDivider } from "../../components/TicketDivider/TicketDivider";
import QRCode from 'react-native-qrcode-svg';
import { CustomNavbar } from "../../components/Navbar/Navbar";
import firestore from '@react-native-firebase/firestore';
import { GetUuidList, SetUuidList } from "../../helper/functions/Functions";

export  const GetCodeScreen = () => {

  const [qrUuid, setQrUuid] = useState();
  const [uuidList, setUuidList] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    _getUuid();
  }, []);

  useEffect(() => {
    console.log("get uuid res : ",qrUuid);
  }, [qrUuid]);


  const _getUuid = async ( ) => {

    let randomUuid = null;

    GetUuidList()
      .then((list) => {

        let randomIndex = Math.floor(Math.random() * list.length)

        randomUuid = list[randomIndex]

        setQrUuid(randomUuid)

        list.splice(randomIndex,1)

        SetUuidList(list)

      })
      .catch(() => {
        console.log("Get uuid list catch !");
        setNoData(true)
      })

  }

  return (
    <View
      style={{
        flex:1,
        backgroundColor:AppColors.green,
        alignItems:"center"
      }}>

      <CustomNavbar title={"Kare Kod Al"} />

      <View
        style={{
          width: wp(90),
          height:hp(60),
          backgroundColor:AppColors.white,
          alignItems:"center",
          justifyContent:"space-evenly"
        }}>

        {
          !noData ?

            <View
              style={{
                alignItems:"center"
              }}>
              <Text
                style={{
                  fontSize:hp(3.5),
                  color:AppColors.black,
                  fontWeight:"bold"
                }}>

                30 Eylül Cuma

              </Text>

              {
                qrUuid &&
                <QRCode
                  value={qrUuid}
                  logoSize={60}
                />
              }
            </View>

            :

            <View>
              <Text
                style={{
                  fontSize:hp(3.5),
                  color:AppColors.black,
                  fontWeight:"bold"
                }}>

                QR Kod yok !

              </Text>

            </View>
        }



      </View>

      <TicketDivider/>

      <View
        style={{
          height:hp(15),
          width:wp(90),
          backgroundColor:AppColors.white,
          borderBottomLeftRadius:10,
          borderBottomRightRadius:10,
          alignItems:"center",
          justifyContent:"center"
        }}>
        <Image
          source={require("../../assets/image/app-logo.png")}
          style={{
            width:wp(65),
            height:hp(10),
            resizeMode:"stretch"}}/>
      </View>
    </View>
  );
};

