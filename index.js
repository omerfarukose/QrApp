/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from "@react-native-firebase/app";
import PushNotification from "react-native-push-notification";

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios'
})

PushNotification.createChannel(
  {
    channelId: "pauQrApp", // (required)
    channelName: "Channel", // (required)
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

firebase.messaging().setBackgroundMessageHandler(async(response)=>{
  PushNotification.localNotification({
    channelId: "pauQrApp",
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
  })

});

AppRegistry.registerComponent(appName, () => App);
