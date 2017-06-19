import firebase from 'firebase';
import API_CONFIG from 'react-native-config';

const config = {
  apiKey: API_CONFIG.FIREBASE_API,
  authDomain: API_CONFIG.FIREBASE_AUTH_DOMAIN,
  databaseURL: API_CONFIG.FIREBASE_URL
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
