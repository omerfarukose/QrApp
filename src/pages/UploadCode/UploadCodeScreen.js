import React, { useState, useEffect, useContext, useRef } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { QRreader } from "react-native-qr-decode-image-camera";
import * as ImagePicker from "react-native-image-picker";
import { AppColors } from "../../values/Colors/Colors";
import { CustomNavbar } from "../../components/Navbar/Navbar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import { GetDayCode, GetUuidList, SetUuidList } from "../../helper/functions/Functions";

export const UploadCodeScreen = () => {

  let dayCodeRef = useRef(null)

  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {

    dayCodeRef.current = GetDayCode();
    console.log("Day code ref : ",dayCodeRef.current);

    GetUuidList()
      .then((list) => {
        console.log("list : ",list);
      })
      .catch(() => {
        console.log("Get uuid list catch !");
      })

  }, []);

  const _handleSelectImage = () => {
    ImagePicker.launchImageLibrary(ImageLibraryOptions, response => {

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {

        console.log("Response uri exist : ", response.assets[0].uri);

        if (response.assets[0].uri) {

          let path = response.assets[0].uri;

          QRreader(path)
            .then(qrData => {
              console.log("Q Reader data : ", qrData);

              GetUuidList()
                .then((list) => {
                  console.log("list : ",list);

                  SetUuidList([...list,qrData])
                    .then(() => {
                      setUploadComplete(true)
                    })
                })
                .catch(() => {
                  console.log("Get uuid list catch !");

                  SetUuidList([qrData])
                    .then(() => {
                      setUploadComplete(true)
                    })
                })

            })
            .catch(err => {
              console.log("QReader err : ", err);
            });
        }
      }
    });
  }

  const _renderButton  = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          _handleSelectImage()
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

        <Icon name={"upload"} size={hp(4.5)} color={AppColors.black} />

        <Text
          style={{
            fontSize:hp(3),
            color:AppColors.black,
            fontWeight:"bold",
            marginLeft:hp(1),
          }}>

          Kare Kod yükle

        </Text>

      </TouchableOpacity>
    );
  }

  const _renderUploadCompleteView = ( ) => {
    return(
      <View style={{alignItems:"center"}}>
        <Icon name={"check"} size={hp(10)} color={AppColors.white} />
        <Text
          style={{
            color:AppColors.white,
            fontSize:hp(4)
          }}>
          Qr başarıyla yüklendi
        </Text>
        <Text
          style={{
            color:AppColors.white,
            fontSize:hp(4)
          }}>
          Teşekkürler !
        </Text>
      </View>
    )
  }


  return (
    <View
      style={{
        flex:1,
        alignItems:"center",
        padding:20,
        paddingTop:0,
        backgroundColor:AppColors.green
      }}>

      <CustomNavbar title={"Kare Kod Yükle"} />

      <View
        style={{
          flex:1,
          alignItems:"center",
          justifyContent:"center"
        }}>

        {
          !uploadComplete ?

            _renderButton()

            :

            _renderUploadCompleteView()
        }


      </View>




    </View>
  );
};

const ImageLibraryOptions = {
  maxHeight: 200,
  maxWidth: 200,
  selectionLimit: 1,
  quality:1,
  mediaType: "photo",
  includeBase64: true,
  includeExtra: true
};
