import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAQAOeRQ7IJy-A49MqS-K4dzRWPw2MOhqs',
  authDomain: 'money-count-dcbe1.firebaseapp.com',
  projectId: 'money-count-dcbe1',
  storageBucket: 'money-count-dcbe1.appspot.com',
  messagingSenderId: '655633403456',
  appId: '1:655633403456:web:90fcda148d3212172dd9a5',
};

// initil firebase
firebase.initializeApp(firebaseConfig);

// initil service
const projectFirestore = firebase.firestore();

const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
