import NetInfo from '@react-native-community/netinfo';
import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SideMenu from './app/navigation/SideMenu';
import {
  getFCMToken,
  NotificationListener,
  requestUserPermission,
} from './app/services/FirebaseNotifications';
import './app/utils/i18n';
function App(): JSX.Element {
  //init();
  console.log('dpp', I18nManager.isRTL);
  console.log('dpp', i18n.language);
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    NotificationListener();
  }, []);

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected ?? false);
      console.log(`Connection type: ${state.type}`);
      console.log(`Is connected? ${state.isConnected}`);
      // console.log(`Is internet reachable? ${state.isInternetReachable}`);
      // console.log(`prevConnected: ${prevConnected}`);
      console.log(`connected: ${connected}`);
      console.log('-------------------');
      /* if (connected !== state.isConnected && state.isConnected) {
        OnlineLocalNotification();
      } else if (connected !== state.isConnected && !state.isConnected) {
        OfflineLocalNotification();
      }*/
    });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(`connected: ${connected}`);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SideMenu />
      <Modal isVisible={!connected} style={styles.mainModel}>
        <View style={styles.failureContent}>
          <MaterialIcons
            name="signal-wifi-connected-no-internet-4"
            size={100}
            color="white"
          />
          <Text style={styles.popupTitle}>فشل في الاتصال بالانترنت!!</Text>
          <Text style={styles.popupSubTitle}>
            من فضلك اعد الاتصال بالانترنت وحاول مرة اخرى
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
  // return <SignupScreen />;
}

export default App;

const styles = StyleSheet.create({
  mainModel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  failureContent: {
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    width: '95%',
    borderWidth: 2,
    borderColor: 'gray',
  },
  popupTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  popupSubTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  failureBtnView: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 5,
    width: '95%',
    marginVertical: 10,
  },
  failureBtnText: {
    color: '#D50000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

function init() {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      compatibilityJSON: 'v3',
      lng: I18nManager.isRTL ? 'ar' : 'en',

      keySeparator: false, // we do not use keys in form messages.welcome

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });

  i18n.changeLanguage('en').then(() => {
    I18nManager.forceRTL(i18n.language === 'ar');
  });
}

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
