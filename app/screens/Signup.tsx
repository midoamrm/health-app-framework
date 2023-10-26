import auth from '@react-native-firebase/auth';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../assets/values/Colors';
import user from '../utils/User';
export default function SignupScreen({ navigation, route }: any) {
  const item = route.params.itt2;
  //to avoid using the side menu inside the login screen
  const { t, i18n } = useTranslation();
  navigation.setOptions({ headerShown: false, swipeEnabled: false });
  const theme = useColorScheme();
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [securePassword1, setSecurePassword1] = useState(true);
  const [securePassword2, setSecurePassword2] = useState(true);

  const [idError, setIDError] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
  const [passwordError2, setPasswordError2] = useState('');

  const [isModalVisibleSucess, setModalSucessVisible] = useState(false);
  const [isModalVisibleFailure, setModalFailureVisible] = useState(false);

  const [selectedId, setSelectedId] = useState<string | undefined>('1');

  const [loading, setLoading] = useState(false);

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: t('male'),
        value: 'male',
        color: '#1fab91',
        labelStyle: { fontSize: 18, color: '#8DA9B6' },
      },
      {
        id: '2',
        label: t('female'),
        value: 'female',
        color: '#1fab91',
        labelStyle: { fontSize: 18, color: '#8DA9B6' },
      },
    ],
    [],
  );

  const chooseGender = (selected: string) => {
    setSelectedId(selected);
    // get tha value of the selected radio button from radioButtons
    radioButtons.map((button) => {
      if (button.id === selected) {
        setGender(button.value ?? '');
      }
    });
    // console.log(selected);
    // console.log(gender);
  };

  const idValidation = (text: string) => {
    setID(text);
    const idRegex = /^\d{14}$/;
    if (text.length === 0) {
      setIDError('رقم الهوية مطلوب');
    } else if (!idRegex.test(text)) {
      setIDError('رقم الهوية غير صحيح');
    } else {
      setIDError('');
    }
  };
  const nameValidation = (text: string) => {
    setName(text);
    // email should be letters only
    const nameRegex = /^(?!.*[\u0660-\u0669])[a-zA-Z\u0600-\u06FF\s]{5,20}$/;
    if (text.length === 0) {
      setNameError('الاسم مطلوب');
    } else if (!nameRegex.test(text)) {
      setNameError('الاسم غير صحيح');
    } else {
      setNameError('');
    }
  };

  const passwordValidation1 = (text: string) => {
    setPassword1(text);
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

    if (text.length === 0) {
      passwordErrorTemp = 'كلمة السر مطلوبة';
    } else if (!lowercaseRegex.test(text)) {
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

    setPasswordError1(passwordErrorTemp);
  };

  const passwordValidation2 = (text: string) => {
    setPassword2(text);
    if (text.length === 0) {
      setPasswordError2('تأكيد كلمة السر مطلوب');
    } else if (text !== password1) {
      setPasswordError2('كلمة السر غير متطابقة');
    } else {
      setPasswordError2('');
    }
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
  const validatePhoneNumber = (text: string) => {
    setPhoneNum(text);
    // make sure that the phone number starts with +
    const phoneNumberRegex = /^\+/;
    if (text.length === 0) {
      setPhoneNumberError('رقم الجوال مطلوب');
    } else if (!phoneNumberRegex.test(text)) {
      setPhoneNumberError('رقم الجوال غير صحيح');
    } else {
      setPhoneNumberError('');
    }
  };

  const ageValidation = (text: string) => {
    setAge(text);
    const ageRegex = /^\d{1,2}$/;
    if (text.length === 0) {
      setAgeError('العمر مطلوب');
    } else if (!ageRegex.test(text) || text === '0') {
      setAgeError('العمر غير صحيح');
    } else {
      setAgeError('');
    }
  };

  const toggleModalSucess = () => {
    setModalSucessVisible(!isModalVisibleSucess);
  };

  const toggleModalFailure = () => {
    setModalFailureVisible(!isModalVisibleFailure);
  };

  const handleSingup = () => {
    if (
      id === '' ||
      name === '' ||
      age === '' ||
      gender === '' ||
      phoneNum === '' ||
      email === '' ||
      password1 === '' ||
      password2 === '' ||
      phoneNumberError !== '' ||
      emailError !== '' ||
      idError !== '' ||
      nameError !== '' ||
      ageError !== '' ||
      passwordError1 !== '' ||
      passwordError2 !== ''
    ) {
      toggleModalFailure();
    } else {
      signupAuth();
    }
  };

  const signupAuth = async () => {
    // set the user data\
    setLoading(true);
    try {
      user.name = name;
      user.age = age;
      user.id = id;
      user.gender = gender;
      user.phoneNum = phoneNum;
      user.email = email;
      user.password = password1;
      user.type = 'email';
      await auth()
        .createUserWithEmailAndPassword(email, password1)
        .then(async () => {
          console.log('User account created & signed in!');
          await auth().currentUser?.sendEmailVerification();
          await auth().currentUser?.updateProfile({
            displayName: name,
          });
          console.log('user signup: ', auth().currentUser);
          await auth().signOut();
        })
        .catch((error: any) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
      // console.log('user: ', user);
      toggleModalSucess();
    } catch (error: any) {
      console.log(error.message);
      setModalFailureVisible(true);
    }
    setLoading(false);
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
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#1D5B8C" />
      {appBar()}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}>
        <View
          style={{
            backgroundColor: item === 'l' ? Colors.primary2 : Colors.primary1,
            height: '100%',
            width: '100%',
          }}>
          <View style={styles.container}>
            <View style={styles.logoImgView}>
              <Image
                style={{ width: 120, height: 120, borderRadius: 20 }}
                source={require('../assets/images/ik.png')}
              />
            </View>
            <View style={styles.allInputs}>
              <View style={styles.inputView}>
                {i18n.language === 'ar' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('id')}
                    placeholderTextColor="#8DA9B6"
                    onChangeText={(text) => idValidation(text)}
                    value={id}
                    // start writing from the right side
                    textAlign="right"
                    keyboardType="numeric"
                    maxLength={14}
                  />
                )}
                {i18n.language === 'en' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('id')}
                    placeholderTextColor="#8DA9B6"
                    onChangeText={(text) => idValidation(text)}
                    value={id}
                    // start writing from the right side
                    textAlign="left"
                    keyboardType="numeric"
                    maxLength={14}
                  />
                )}
              </View>
              {idError !== '' ? (
                <Text style={styles.errorText}>{idError}</Text>
              ) : null}
              <View style={styles.inputView}>
                {i18n.language === 'ar' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('name')}
                    placeholderTextColor="#8DA9B6"
                    // secureTextEntry={true}
                    onChangeText={(text) => nameValidation(text)}
                    value={name}
                    textAlign="right"
                    maxLength={20}
                  />
                )}
                {i18n.language === 'en' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('name')}
                    placeholderTextColor="#8DA9B6"
                    // secureTextEntry={true}
                    onChangeText={(text) => nameValidation(text)}
                    value={name}
                    textAlign="left"
                    maxLength={20}
                  />
                )}
              </View>
              {nameError !== '' ? (
                <Text style={styles.errorText}>{nameError}</Text>
              ) : null}
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
              <View style={styles.inputView}>
                {i18n.language === 'ar' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('password')}
                    placeholderTextColor="#8DA9B6"
                    secureTextEntry={securePassword1}
                    onChangeText={(text) => passwordValidation1(text)}
                    value={password1}
                    textAlign="right"
                    maxLength={30}
                  />
                )}
                {i18n.language === 'en' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('password')}
                    placeholderTextColor="#8DA9B6"
                    secureTextEntry={securePassword1}
                    onChangeText={(text) => passwordValidation1(text)}
                    value={password1}
                    textAlign="left"
                    maxLength={30}
                  />
                )}

                <TouchableOpacity
                  onPress={() => setSecurePassword1(!securePassword1)}
                  style={styles.secureBtn}>
                  <Ionicons
                    name={securePassword1 ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#8DA9B6"
                  />
                </TouchableOpacity>
              </View>
              {passwordError1 !== '' ? (
                <Text style={styles.errorText}>{passwordError1}</Text>
              ) : null}
              <View style={styles.inputView}>
                {i18n.language === 'ar' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('password2')}
                    placeholderTextColor="#8DA9B6"
                    secureTextEntry={securePassword2}
                    onChangeText={(text) => passwordValidation2(text)}
                    value={password2}
                    textAlign="right"
                    maxLength={30}
                  />
                )}
                {i18n.language === 'en' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('password2')}
                    placeholderTextColor="#8DA9B6"
                    secureTextEntry={securePassword2}
                    onChangeText={(text) => passwordValidation2(text)}
                    value={password2}
                    textAlign="left"
                    maxLength={30}
                  />
                )}

                <TouchableOpacity
                  onPress={() => setSecurePassword2(!securePassword2)}
                  style={styles.secureBtn}>
                  <Ionicons
                    name={securePassword2 ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#8DA9B6"
                  />
                </TouchableOpacity>
              </View>
              {passwordError2 !== '' ? (
                <Text style={styles.errorText}>{passwordError2}</Text>
              ) : null}
              <View style={styles.inputView}>
                {i18n.language === 'ar' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('phoneno')}
                    placeholderTextColor="#8DA9B6"
                    // secureTextEntry={true}
                    onChangeText={(text) => validatePhoneNumber(text)}
                    value={phoneNum}
                    keyboardType="phone-pad"
                    textAlign="right"
                    //   maxLength={11}
                  />
                )}
                {i18n.language === 'en' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('phoneno')}
                    placeholderTextColor="#8DA9B6"
                    // secureTextEntry={true}
                    onChangeText={(text) => validatePhoneNumber(text)}
                    value={phoneNum}
                    keyboardType="phone-pad"
                    textAlign="left"
                    //   maxLength={11}
                  />
                )}
              </View>
              {phoneNumberError !== '' ? (
                <Text style={styles.errorText}>{phoneNumberError}</Text>
              ) : null}
              <View style={styles.inputView}>
                {i18n.language === 'ar' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('age')}
                    placeholderTextColor="#8DA9B6"
                    // secureTextEntry={true}
                    onChangeText={(text) => ageValidation(text)}
                    value={age}
                    textAlign="right"
                    maxLength={2}
                    keyboardType="numeric"
                  />
                )}
                {i18n.language === 'en' && (
                  <TextInput
                    style={styles.inputText}
                    placeholder={t('age')}
                    placeholderTextColor="#8DA9B6"
                    // secureTextEntry={true}
                    onChangeText={(text) => ageValidation(text)}
                    value={age}
                    textAlign="left"
                    maxLength={2}
                    keyboardType="numeric"
                  />
                )}
              </View>
              {ageError !== '' ? (
                <Text style={styles.errorText}>{ageError}</Text>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#8DA9B6',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {t('gender')}:
                </Text>
                <View>
                  <RadioGroup
                    radioButtons={radioButtons}
                    onPress={chooseGender}
                    selectedId={selectedId}
                    containerStyle={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}
                  />
                </View>
              </View>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#8DA9B6" />
            ) : (
              <TouchableOpacity style={styles.loginBtn} onPress={handleSingup}>
                <Text style={styles.loginText}>{t('cerateaccount')}</Text>
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
                <Text style={styles.popupTitle}>تم!!</Text>
                <Text style={styles.popupSubTitle}>تم انشاء الحساب بنجاح</Text>
                <View style={styles.sucessBtnView}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModalSucess();

                      setID('');
                      setPhoneNum('');
                      setPassword1('');
                      setPassword2('');
                      setEmail('');
                      setName('');
                      setAge('');
                      setSelectedId('');
                      setSecurePassword1(true);
                      setSecurePassword2(true);
                      setGender('');
                      navigation.navigate('Login');
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
                <Text style={styles.popupTitle}>فشل!!</Text>
                <Text style={styles.popupSubTitle}>
                  بيانات انشاء الحساب غير صحيحة من فضلك أعد المحاولة
                </Text>
                <View style={styles.failureBtnView}>
                  <TouchableOpacity onPress={toggleModalFailure}>
                    <Text style={styles.failureBtnText}>الرجوع</Text>
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
    marginTop: -70,
  },
  loginText: {
    color: 'white',
    fontSize: 25,
  },
  logoImgView: {
    alignItems: 'center',
    transform: [{ scale: 0.8 }],
    marginTop: -90,
  },
  allInputs: {
    width: '100%',
    alignItems: 'center',
    marginTop: -90,
  },
  titleImg: {
    alignItems: 'center',
    // modify the size of the image
    transform: [{ scale: 0.8 }],
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
    backgroundColor: '#D50000',
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
    color: '#D50000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successContent: {
    backgroundColor: '#00C853',
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
    color: '#00C853',
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
});
