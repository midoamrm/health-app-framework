import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../assets/values/Colors';
import user, { admin } from '../utils/User';

export default function OtpScreen({ navigation }: any) {
  //to avoid using the side menu inside the login screen
  navigation.setOptions({ headerShown: false, swipeEnabled: false });
  const [counter, setCounter] = useState(60);
  const { t, i18n } = useTranslation();
  // If null, no SMS has been sent
  // const [confirm, setConfirm] = useState(null);
  const [confirm, setConfirm]: [any, any] = useState();
  const [changed, setChanged] = useState(0);

  const [code, setCode] = useState('');
  const [mounted, setMounted] = useState(false);
  const [wrongCode, setWrongCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cl = async () => {
    try {
      const value = await AsyncStorage.getItem('d');
      console.log(value);
      if (value === 'd') {
        // isDarkTheme = Colors.primary1;
        console.log('modeee', 'dark');
        navigation.navigate('MainScreen', { itx: value });
      }
      if (value === 'l') {
        //  isDarkTheme = Colors.primary2;
        console.log('modeee', 'ligth');
        navigation.navigate('MainScreen', { itx: value });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // send the otp when the component is mounted
  useEffect(() => {
    console.log('user', user);
    if (!mounted) {
      if (user.type !== 'admin') {
        signInWithPhoneNumber(user.phoneNum ?? '+201023815549');
        Keyboard.dismiss();
        setMounted(true);
      }
    }
  }, []);

  // Handle login
  function onAuthStateChanged(user: any) {
    console.log('Auth State Changed', user);
    if (user) {
      navigation.navigate('MedicalServices');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: any) {
    console.log('Sending code to', phoneNumber);
    setCounter(60);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    console.log('Confirmation Code Sent');
  }

  async function confirmCode(code: any) {
    console.log('Confirming');
    setChanged(changed + 1);
    setIsLoading(true);
    setWrongCode(false);
    if (user.type === 'admin') {
      // check that code is 123456
      if (code === '123456') {
        console.log('Admin confirmed');
        admin.loggedIn = true;
        navigation.navigate('MedicalServices');
        setIsLoading(false);
        return;
      } else {
        // wrong code
        setWrongCode(true);
        setIsLoading(false);
        return;
      }
    }
    try {
      if (confirm != null) {
        await confirm.confirm(code);
        if (user.name) {
          await auth().currentUser?.updateProfile({
            displayName: user.name,
          });
        }
        if (user.email) {
          await auth().currentUser?.updateEmail(user.email);
        }
        if (user.password) {
          await auth().currentUser?.updatePassword(user.password);
        }
        console.log('Confirmed');
      }
    } catch (error) {
      setWrongCode(true);
      console.log('Invalid code.');
    } finally {
      setIsLoading(false);
    }
  }

  // one minute timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) {
          return prevCounter - 1;
        } else {
          clearInterval(interval); // Stop the interval when counter reaches 0
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  function appBar() {
    return (
      <View style={styles.appBarView}>
        <TouchableOpacity
          style={styles.appBar}
          onPress={() => {
            cl();
          }}>
          <Ionicons
            name="arrow-redo"
            size={25}
            color="white"
            style={styles.backArrow}
          />
          <Text style={styles.header}>{t('maiin')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#1D5B8C" />
      {appBar()}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}>
        <View
          style={{
            flex: 1,
          }}>
          <View style={styles.container}>
            <View style={styles.logoImgView}>
              <Image
                style={{ width: 120, height: 120, borderRadius: 20 }}
                source={require('../assets/images/ik.png')}
              />
            </View>
            <Text style={styles.subText}>{t('x1')}</Text>
            <TouchableOpacity onPress={() => confirmCode(code)}>
              <Text style={styles.subText2}>{t('x2')}</Text>
            </TouchableOpacity>
            {i18n.language === 'ar' && (
              <OtpInputs
                key={changed}
                handleChange={(code) => {
                  setWrongCode(false);
                  if (code.length === 6) {
                    console.log(`Code is ${code}, you are good to go!`);
                    confirmCode(code);
                    setCode(code);
                    Clipboard.setString('');
                  }
                }}
                numberOfInputs={6}
                autofillFromClipboard={true}
                inputStyles={{
                  ...styles.underlineStyleBase,
                  ...styles.underlineStyleHighLighted,
                  ...(wrongCode && { borderColor: 'red' }),
                }}
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                }}
              />
            )}
            {i18n.language === 'en' && (
              <OtpInputs
                key={changed}
                handleChange={(code) => {
                  setWrongCode(false);
                  if (code.length === 6) {
                    console.log(`Code is ${code}, you are good to go!`);
                    confirmCode(code);
                    setCode(code);
                    Clipboard.setString('');
                  }
                }}
                numberOfInputs={6}
                autofillFromClipboard={true}
                inputStyles={{
                  ...styles.underlineStyleBase,
                  ...styles.underlineStyleHighLighted,
                  ...(wrongCode && { borderColor: 'red' }),
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              />
            )}

            {isLoading && (
              <ActivityIndicator size="small" color={Colors.secondary1} />
            )}
            {wrongCode && <Text style={styles.errorText}>{t('x3')}</Text>}
            <Text style={styles.subText}>{formatTime(counter)}</Text>
            {counter === 0 && (
              <>
                <Text style={styles.subText}>{t('x4')}</Text>
                <TouchableOpacity
                  onPress={() => {
                    signInWithPhoneNumber(user.phoneNum ?? '+201023815549');
                  }}>
                  <Text style={styles.subText2}>{t('x5')}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    borderTopRightRadius: 50,
    paddingTop: 50,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#124963',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '1%',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#124963',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#00AE93',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 25,
  },
  logoImgView: {
    alignItems: 'center',
    marginVertical: 20,
    transform: [{ scale: 0.8 }],
    marginTop: -30,
  },

  titleImg: {
    alignItems: 'center',
    // modify the size of the image
    transform: [{ scale: 0.8 }],
    marginBottom: 110,
  },
  scroll: {},
  appBarView: {
    backgroundColor: '#1D5B8C',
    paddingVertical: 10,
  },
  appBar: {
    // width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    direction: 'rtl',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    paddingRight: 10,
  },
  backArrow: {
    // fontWeight: 'bold',
    // fontFamily: 'Arial',
    paddingRight: 10,
  },
  subText: {
    color: Colors.grey,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  subText2: {
    color: Colors.secondary1,
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
  },
  underlineStyleBase: {
    width: 45,
    height: 60,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    color: Colors.primary1,
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
  },
  underlineStyleHighLighted: {
    borderColor: Colors.secondary1,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
    marginBottom: 10,
  },
});
