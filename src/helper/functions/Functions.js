import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

export function GetDayCode () {

  const d = new Date();

  let day = d.getDate()

  day = day < 10 ? "0"+day : day;
  // console.log("Day :",day);

  let month = d.getMonth();
  month++;

  month = month < 10 ? "0"+month : month
  // console.log("Month : ",month);

  let year = d.getFullYear();
  // console.log("Year : ",year);

  // console.log("day code : ",day.toString()+month+year);

  return day.toString()+month+year
}

export function CheckMail ( text ) {

  let mailKey = 'posta.pau.edu.tr';

  let isValid = new RegExp('\\b' + mailKey + '\\b').test(text);

  return new Promise((resolve, reject) => {

    isValid ? resolve() : reject();

  })
}

export async function MailVerification ( email ) {

  auth().currentUser.sendEmailVerification({
    handleCodeInApp:true,
    url:"hhtps://qr-app-2e359.firebaseapp.com"
  })
    .then(()=>{
      console.log("e mail send !");

      firestore()
        .collection('users')
        .doc("pamukkale")
        .set({
          mail:email
        })
        .then(() => {
          console.log("User added !");
        })
        .catch(() => {
          console.log("Add user error !");
        })
    })

  // return new Promise((resolve,reject) => {
  //
  //   auth().currentUser.sendEmailVerification({
  //     handleCodeInApp:true,
  //     url:"hhtps://qr-app-2e359.firebaseapp.com"
  //     })
  //     .then(()=>{
  //       console.log("e mail send !");
  //
  //       firestore()
  //         .collection('users')
  //         .doc("pamukkale")
  //         .set({
  //           mail:email
  //         })
  //         .then(() => {
  //           console.log("User added !");
  //         })
  //         .catch(() => {
  //           console.log("Add user error !");
  //         })
  //     })
  // })

}

export async function CreateUser ( email, password ){

  const username = email.substring(0, email.indexOf('@'));

  return new Promise((resolve,reject) => {
    auth().createUserWithEmailAndPassword(email,password)
      .then(() => {
        resolve()
        firestore()
          .collection('users')
          .doc(username)
          .set(
            {
              email:email,
              uploadCounter:0,
              giftCode:false
            },
            // {
            //   merge:true
            // }
          )
      })
      .catch(()=>{
        reject()
      })
  })
}

export async function UserLogin ( email, password ) {

  return new Promise((resolve, reject) => {

    auth().signInWithEmailAndPassword(email,password)
      .then(resolve)
      .catch(reject)


  })
}

export async function GetUserUploadCounter(){

  let username = GetCurrentUserUsername();

  const userData = await firestore().collection('users').doc(username).get();

  let uploadCounter = userData.data().uploadCounter;

  return new Promise((resolve, reject) => {

    uploadCounter >= 0 ? resolve(uploadCounter) : reject();

  })
}

export async function GetUuidList () {

  let dayCode = GetDayCode();

  const listData = (await firestore().collection('qr-uuids').doc(dayCode).get()).data();

  console.log("func list data :" , listData.uuidList );

  return new Promise((Resolve,Reject) => {

    if(listData.uuidList.length >= 1){
      Resolve(listData.uuidList)
    }
    else{
      Reject();
    }

  })

}

export function GetCurrentUserUsername ( ) {
  let currentUser = auth().currentUser.email
  return  currentUser.substring(0, currentUser.indexOf('@'));
}

export async function SetUuidList (list) {

  let dayCode = GetDayCode();

  await firestore()
    .collection('qr-uuids')
    .doc(dayCode)
    .set({
      uuidList: list,
    })
    .then(() => {
      incrementUploadCounter()
      console.log('Uuid list set !');
    });
}

export async function incrementUploadCounter ( ) {

  let giftCode = false;
  let username = GetCurrentUserUsername();

  GetUserUploadCounter(username)
    .then((uploadCounter) => {

      switch (uploadCounter) {
        case 3:
          giftCode=true;
          break;

        case 2:
          giftCode = true;
          uploadCounter++
          break;

        default:
          giftCode = false;
          uploadCounter++;
      }

      firestore()
        .collection('users')
        .doc(username)
        .set(
          {
            giftCode:giftCode,
            uploadCounter:uploadCounter,
          },
          {
            merge:true
          }
        )
        .then(() => {
          console.log("Score updated !");
        })
    })
    .catch(() => {
      console.log("Get user upload counter error at increment upload score !");
    })
}

function CheckIsCodeAlreadyExist () {

}



