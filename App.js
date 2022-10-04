import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QrContextProvider } from "./src/context/QrContext";
import auth from "@react-native-firebase/auth";
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

//screens
import { HomeScreen } from "./src/pages/HomeScreen";
import { UploadCodeScreen } from "./src/pages/UploadCode/UploadCodeScreen";
import { GetCodeScreen } from "./src/pages/GetCode/GetCodeScreen";
import { LoginScreen } from "./src/pages/Auth/Login/LoginScreen";
import { SignUpScreen } from "./src/pages/Auth/SignUp/SignUpScreen";
import { VerifyCodeScreen } from "./src/pages/Auth/VerifyCode/VerifyCodeScreen";

const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
    firebase.messaging().onMessage(response => {
      console.log(JSON.stringify(response));

      if (Platform.OS !== 'ios') {
        showNotification(response.notification);
        return;
      }

      PushNotificationIOS.requestPermissions().then(() =>
        showNotification(response.notification),
      );

    });
  }, []);

  const showNotification = (notification) => {
    PushNotification.localNotification({
      channelId: "pauQrApp",
      autoCancel: true,
      subText: 'Local Notification Demo',
      title: 'PAU QR',
      message: 'Pau Qr müdavim ile bugünli Qr kodun hazır !',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
    })
  };

  useEffect(() => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => console.log(x))
      .catch(e => console.log(e));
  }, []);


  return (
    <QrContextProvider>
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName={ auth().currentUser ? "Home" : "Login"}
            screenOptions={{
              headerShown: false,
            }}>

            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
            <Stack.Screen name="UploadCode" component={UploadCodeScreen} />
            <Stack.Screen name="GetCode" component={GetCodeScreen} />

          </Stack.Navigator>
      </NavigationContainer>
    </QrContextProvider>

  );
}

export default App;
