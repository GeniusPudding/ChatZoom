import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBwwBAilvh4f_W5kAqRiiODuQxzqhQhsyc",
    authDomain: "geniuspudding.firebaseapp.com",
    databaseURL: "https://geniuspudding-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "geniuspudding",
    storageBucket: "geniuspudding.appspot.com",
    messagingSenderId: "946635879957",
    appId: "1:946635879957:web:d9ac32d773ad0c5b23c01c",
    measurementId: "G-LFSJVSRHN3"
  };

export const db = firebase.initializeApp(firebaseConfig).firestore()

const {Timestamp, GeoPoint} = firebase.firestore
export {Timestamp, GeoPoint}

db.settings({timestampsInSnapshots: true})