import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../assets/values/Colors';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { handleGoogleSingIn } from '../services/Google';
import user, { admin } from '../utils/User';
var isDarkTheme = '';

export default function LoginScreen({ navigation, route }: any) {
  const item = route.params.itt;
  const { t, i18n } = useTranslation();
  //to avoid using the side menu inside the login screen
  navigation.setOptions({ headerShown: false, swipeEnabled: false });
  const theme = useColorScheme();
  const [isModalVisibleSucess, setModalSucessVisible] = useState(false);
  const [isModalVisibleFailure, setModalFailureVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [changed, setChanged] = useState(0);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  var value;
  const [loading, setLoading] = useState(false);
  const cl = async () => {
    try {
      value = await AsyncStorage.getItem('d');
      console.log(value);
      if (value === 'd') {
        isDarkTheme = Colors.primary1;
        console.log('modeee', 'dark');
      }
      if (value === 'l') {
        isDarkTheme = Colors.primary2;
        console.log('modeee', 'ligth');
      }
    } catch (error) {
      console.log(error);
    }
  };
  cl();
  function onAuthStateChanged(user_: any) {
    console.log('Auth State Changed', user_);
    if (user_) {
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (auth().currentUser) {
      if (!isModalVisibleSucess) {
        if (user.type === 'email') {
          auth()
            .signOut()
            .then(() => {
              console.log('Navigating to Otp');
              navigation.navigate('Otp');
            });
        } else {
          console.log('Navigating to MedicalServices');
          navigation.navigate('MedicalServices');
        }
      }
    }
    if (user.loggedIn) {
      if (!isModalVisibleSucess) {
        setLoading(false);
        // reset all
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        setChanged(changed + 1);
        navigation.navigate('Otp');
      }
    }
  }, [isModalVisibleSucess]);

  const loginAuth = async () => {
    setLoading(true);
    if (email === admin.email && password === admin.password) {
      user.email = admin.email;
      user.password = admin.password;
      user.phoneNum = admin.phoneNum;
      user.type = 'admin';
      user.name = admin.name;
      user.loggedIn = true;
      toggleModalSucess();
      return;
    }
    try {
      user.email = email;
      user.password = password;
      user.type = 'email';
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async () => {
          console.log('User account signed in!');
          user.loggedIn = true;
          toggleModalSucess();
          setChanged(changed + 1);
        })
        .catch((error) => {
          console.log(error.message);
          setModalFailureVisible(true);
        });
    } catch (error: any) {
      console.log(error.message);
      setModalFailureVisible(true);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      console.log('google b: ');
      const res = await handleGoogleSingIn();
      console.log('google res: ', res);

      // set the user data\
      // console.log('response: ', response);
      user.email = res.user?.email;
      user.name = res.user?.displayName;
      user.phoneNum = res.user?.phoneNumber;
      user.id = res.user?.uid;
      user.photo = res.user?.photoURL;
      user.type = 'google';
      toggleModalSucess();
    } catch (error: any) {
      console.log('googel error', error.message);
      setModalFailureVisible(true);
    }
    setLoading(false);
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    toggleModal();
    setLoading(false);
    /* try {
      const res = await handleFacebookSingIn();
      console.log('facebook res: ', res);

      // set the user data\

      toggleModalSucess();
    } catch (error: any) {
      console.log(error.message);
      setModalFailureVisible(true);
    }
  */
  };

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text.length === 0) {
      setEmailError('البريد الالكتروني مطلوب');
    } else if (!emailRegex.test(text)) {
      setEmailError('البريد الالكتروني غير صحيح');
    } else {
      setEmailError('');
    }
  };

  const passwordValidation = (text: string) => {
    setPassword(text);
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+=[{\]};:'",.<>?]/;
    const passwordLengthRegex = /.{8,}/;

    const lowercaseErrorMessage =
      'كلمة السر يجب ان تحتوي على حرف صغير واحد على الاقل';
    const uppercaseErrorMessage =
      'كلمة السر يجب ان تحتوي على حرف كبير واحد على الاقل';
    const numberErrorMessage = 'كلمة السر يجب ان تحتوي على رقم واحد على الاقل';
    const specialCharErrorMessage =
      'كلمة السر يجب ان تحتوي على رمز واحد على الاقل (!@#$%^&*()_+=[{]};:\'",.<>?).';
    const passwordLengthErrorMessage =
      'كلمة السر يجب ان تحتوي على 8 احرف على الاقل';

    let passwordErrorTemp = '';

    if (!lowercaseRegex.test(text)) {
      passwordErrorTemp = lowercaseErrorMessage;
    } else if (!uppercaseRegex.test(text)) {
      passwordErrorTemp = uppercaseErrorMessage;
    } else if (!numberRegex.test(text)) {
      passwordErrorTemp = numberErrorMessage;
    } else if (!specialCharRegex.test(text)) {
      passwordErrorTemp = specialCharErrorMessage;
    } else if (!passwordLengthRegex.test(text)) {
      passwordErrorTemp = passwordLengthErrorMessage;
    }
    if (text === admin.password) {
      passwordErrorTemp = '';
    }
    setPasswordError(passwordErrorTemp);
  };

  const toggleModalSucess = () => {
    setModalSucessVisible(!isModalVisibleSucess);
  };

  const toggleModalFailure = () => {
    setModalFailureVisible(!isModalVisibleFailure);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = () => {
    // Handle login logic here
    // open message to the user to enter the data if there is any missing field
    if (
      email === '' ||
      password === '' ||
      emailError !== '' ||
      passwordError !== ''
    ) {
      toggleModalFailure();
    } else {
      loginAuth();
    }
  };

  function appBar() {
    return (
      <View style={styles.appBarView}>
        <TouchableOpacity
          style={styles.appBar}
          onPress={() => navigation.navigate('MainScreen')}>
          <Ionicons
            name="arrow-redo-circle-outline"
            size={20}
            color="white"
            style={styles.backArrow}
          />
          <Text style={styles.header}>{t('maiin')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView key={changed}>
      <StatusBar barStyle="light-content" backgroundColor="#1D5B8C" />
      {appBar()}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}>
        <View
          style={{
            height: '100%',
            backgroundColor: item === 'l' ? Colors.primary2 : Colors.primary1,
            width: '100%',
          }}>
          <View style={styles.container}>
            <View style={styles.logoImgView}>
              <Image
                style={{ width: 120, height: 120, borderRadius: 20 }}
                source={require('../assets/images/ik.png')}
              />
            </View>
            <View style={styles.socialView}>
              {/* sign in with google */}
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={signInWithGoogle}>
                <Ionicons name="logo-google" size={30} color="white" />
                <Text style={styles.socialBtnText}>{t('googel')}</Text>
              </TouchableOpacity>
              {/* sign in with facebook */}
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={signInWithFacebook}>
                <Ionicons name="logo-facebook" size={30} color="white" />
                <Text style={styles.socialBtnText}>{t('facebook')}</Text>
              </TouchableOpacity>
            </View>
            {/* line separator */}
            <View style={styles.lineSeparatorView}>
              <View style={styles.lineSeparator} />
              <Text style={styles.lineSeparatorText}>أو</Text>
              <View style={styles.lineSeparator} />
            </View>
            <View style={styles.allInputs}>
              <View style={styles.inputView}>
                {i18n.language === 'ar' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('email')}
                    aria-label="email"
                    placeholderTextColor="#8DA9B6"
                    onChangeText={(text) => validateEmail(text)}
                    value={email}
                    textAlign="right"
                    maxLength={30}
                    keyboardType="email-address"
                  />
                )}
                {i18n.language === 'en' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('email')}
                    aria-label="email"
                    placeholderTextColor="#8DA9B6"
                    onChangeText={(text) => validateEmail(text)}
                    value={email}
                    textAlign="left"
                    maxLength={30}
                    keyboardType="email-address"
                  />
                )}
              </View>
              {emailError !== '' ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              {/* <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="الملف الطبي الزامي"
                  placeholderTextColor="#8DA9B6"
                  secureTextEntry={secureMedFile}
                  onChangeText={text => medFileValidation(text)}
                  value={medFile}
                  textAlign="right"
                  keyboardType="numeric"
                  maxLength={7}
                />
                <TouchableOpacity onPress={() => setSecureMedFile(!secureMedFile)} style={styles.secureBtn}>
                  <Ionicons name={secureMedFile ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8DA9B6" />
                </TouchableOpacity>
              </View>
              {medFileError !== '' ? (
                <Text style={styles.errorText}>{medFileError}</Text>
              ) : null} */}
              <View style={styles.inputView}>
                {i18n.language === 'ar' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('password')}
                    placeholderTextColor="#8DA9B6"
                    secureTextEntry={securePassword}
                    onChangeText={(text) => passwordValidation(text)}
                    value={password}
                    textAlign="right"
                    maxLength={30}
                  />
                )}
                {i18n.language === 'en' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('password')}
                    placeholderTextColor="#8DA9B6"
                    secureTextEntry={securePassword}
                    onChangeText={(text) => passwordValidation(text)}
                    value={password}
                    textAlign="left"
                    maxLength={30}
                  />
                )}

                <TouchableOpacity
                  onPress={() => setSecurePassword(!securePassword)}
                  style={styles.secureBtn}>
                  <Ionicons
                    name={securePassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#8DA9B6"
                  />
                </TouchableOpacity>
              </View>
              {passwordError !== '' ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              {/* <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="رقم الجوال المسجل بالمدينة اختياري"
                  placeholderTextColor="#8DA9B6"
                  // secureTextEntry={true}
                  onChangeText={text => validatePhoneNumber(text)}
                  value={phoneNum}
                  textAlign="right"
                  keyboardType="phone-pad"
                  maxLength={11}
                />
              </View>
              {phoneNumberError !== '' ? (
                <Text style={styles.errorText}>{phoneNumberError}</Text>
              ) : null} */}
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#8DA9B6" />
            ) : (
              <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>{t('signin')}</Text>
              </TouchableOpacity>
            )}
            <Modal isVisible={isModalVisibleSucess} style={styles.mainModel}>
              <View style={styles.successContent}>
                <Ionicons
                  name="checkmark-done-circle"
                  size={100}
                  color="white"
                />
                {/* <FontAwesome5 name="laugh" size={100} color="white" /> */}

                <Text style={styles.popupSubTitle}>تم تسجيل الدخول بنجاح</Text>
                <View style={styles.sucessBtnView}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModalSucess();

                      // TODO: should send request to get the user data to login
                      // and save the user data in the shared prefrences
                      // setID('');
                      setEmail('');
                      setPassword('');
                    }}>
                    <Text style={styles.successBtnText}>الاستمرار</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Modal isVisible={isModalVisibleFailure} style={styles.mainModel}>
              <View style={styles.failureContent}>
                <Entypo name="circle-with-cross" size={100} color="white" />
                {/* <Ionicons name="sad-outline" size={100} color="white" /> */}

                <Text style={styles.popupSubTitle}>
                  بيانات الدخول غير صحيحة من فضلك أعد المحاولة
                </Text>
                <View style={styles.failureBtnView}>
                  <TouchableOpacity onPress={toggleModalFailure}>
                    <Text style={styles.failureBtnText}>الرجوع</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Modal isVisible={isModalVisible} style={styles.mainModel}>
              <View style={styles.failureContent}>
                {/* <Ionicons name="sad-outline" size={100} color="white" /> */}

                <Text style={styles.popupSubTitle}>
                  Facebook not implemented yet comming soon
                </Text>
                <View style={styles.failureBtnView}>
                  <TouchableOpacity onPress={toggleModal}>
                    <Text style={styles.failureBtnText}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
    justifyContent: 'space-evenly',

    width: '100%',
    height: '100%',
    borderTopRightRadius: 50,
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
    // marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 25,
  },
  logoImgView: {
    width: '80%',
    height: '20%',
    alignItems: 'center',
    transform: [{ scale: 0.9 }],
    paddingBottom: 30,
    borderRadius: 70,
  },
  allInputs: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  titleImg: {
    alignItems: 'center',
    // modify the size of the image
    transform: [{ scale: 0.8 }],
    marginTop: -20,
  },
  scroll: {
    backgroundColor: '#D7EFEE',
    width: '100%',
    height: '100%',
  },
  appBarView: {
    backgroundColor: '#1D5B8C',
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
  mainModel: {
    justifyContent: 'center',
    alignItems: 'center',
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
  failureContent: {
    backgroundColor: '#1D5B8C',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    width: '95%',
  },
  failureBtnView: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 5,
    width: '95%',
    marginVertical: 10,
  },
  failureBtnText: {
    color: '#1D5B8C',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successContent: {
    backgroundColor: '#1D5B8C',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    width: '95%',
  },
  sucessBtnView: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 5,
    width: '95%',
    marginVertical: 10,
  },
  successBtnText: {
    color: '#1D5B8C',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
  secureBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  socialBtn: {
    width: '80%',
    backgroundColor: '#00AE93',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  socialBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  socialView: {
    width: '100%',
    alignItems: 'center',
    // marginTop: 10,
  },
  lineSeparatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  lineSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#124963',
  },
  lineSeparatorText: {
    color: '#124963',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
