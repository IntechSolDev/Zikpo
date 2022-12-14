import {AppRegistry, AppState} from 'react-native';
import {Store, persistor} from './SRC/redux/store';

import App from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PushNotificationConfig from './SRC/Config/PushNotification';
import RNCallKeep from 'react-native-callkeep';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {updateActivedisactive} from './SRC/Api';
import {v4 as uuidv4} from 'uuid';

const Zikpo = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background! inside index', remoteMessage);
  PushNotification.localNotification(remoteMessage);
});
PushNotificationConfig.congigurations();
AppRegistry.registerComponent(appName, () => Zikpo);
