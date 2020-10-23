let instance = null
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

const iosConfig = {
  clientId: '488775034242-vgrqop5bfv1o6jg176dasvvtbaelnj2t.apps.googleusercontent.com',
  appId: '1:488775034242:ios:4dfdf08d518b7116',
  apiKey: 'AIzaSyAnpbc8k7vLnUke22HsDjGQxIiyA3TGVdU',
  databaseURL: "https://cents-1a58c.firebaseio.com/",
  storageBucket: 'cents-1a58c.appspot.com',
  messagingSenderId: '<SENDER_ID>',
  projectId: 'cents-1a58c',
  // enable persistence by adding the below flag
  persistence: true,
};

const androidConfig = {
  clientId: '488775034242-6tuc72lmofhdipfknealj9fgdudj7hge.apps.googleusercontent.com',
  appId: '1:488775034242:android:9fcbe18607fcb564',
  apiKey: 'AIzaSyCKYq3KwqT8dyVrs_rD5mkoBhFrAUOrtpw',
  databaseURL: "https://cents-1a58c.firebaseio.com/",
  storageBucket: 'cents-1a58c.appspot.com',
  messagingSenderId: '<SENDER_ID>',
  projectId: 'cents-1a58c',
  // enable persistence by adding the below flag
  persistence: true,
};

if (!firebase.apps.length) {
  var config = Platform.OS === 'ios' ? iosConfig : androidConfig
  firebase.initializeApp(config);
}

const database = firebase.database();
const messaging = firebase.messaging();
const notifications = firebase.notifications();

export { database, messaging, notifications };
