import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCbBnxIoplzInBzH-GxEEbCBh3IKvByiEM",
  authDomain: "squirrel-bbe49.firebaseapp.com",
  databaseURL: "https://squirrel-bbe49.firebaseio.com",
  projectId: "squirrel-bbe49",
  storageBucket: "squirrel-bbe49.appspot.com",
  messagingSenderId: "390827033245"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;
