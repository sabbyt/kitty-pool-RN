import * as firebase from 'firebase';
import API_CONFIG from 'react-native-config';

const config = {
  apiKey: API_CONFIG.FIREBASE_API,
  authDomain: API_CONFIG.FIREBASE_AUTH_DOMAIN,
  databaseURL: API_CONFIG.FIREBASE_URL,
  projectId: API_CONFIG.PROJECT_ID,
  messagingSenderId: API_CONFIG.SENDER_ID
};

firebase.initializeApp(config);

export default firebase;
