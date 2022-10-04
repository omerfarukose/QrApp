import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBy-KODSao3tY-_tdZe2RZFOi5my8GMCJM",
  authDomain: "qr-app-2e359.firebaseapp.com",
  projectId: "qr-app-2e359",
  storageBucket: "qr-app-2e359.appspot.com",
  messagingSenderId: "1006189514075",
  appId: "1:1006189514075:web:d678e4d33234d13d679e7e",
  measurementId: "G-T1G9LV3N2C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
