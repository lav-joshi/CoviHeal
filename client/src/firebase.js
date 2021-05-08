import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCB08kGPcknLQ2KqAqpOCSp8osvKUON3-0",
    authDomain: "coviheal.firebaseapp.com",
    projectId: "coviheal",
    storageBucket: "coviheal.appspot.com",
    messagingSenderId: "809145997274",
    appId: "1:809145997274:web:f2052021da2945d44112e3"
};


firebase.initializeApp(firebaseConfig);

export default firebase;