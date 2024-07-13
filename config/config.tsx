// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, serverTimestamp } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyChKc3y0ErBtEdikljvmnKG4hB1uwtBeNI",
  authDomain: "taller-cazainsectos.firebaseapp.com",
  databaseURL: "https://taller-cazainsectos-default-rtdb.firebaseio.com",
  projectId: "taller-cazainsectos",
  storageBucket: "taller-cazainsectos.appspot.com",
  messagingSenderId: "534397892697",
  appId: "1:534397892697:web:346f030ca59d0c957cd948",
  measurementId: "G-Z4GE8R9E47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getDatabase(app);
export const storage  = getStorage(app);
