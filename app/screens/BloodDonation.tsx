import auth from '@react-native-firebase/auth';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
import { RadioButtonProps } from 'react-native-radio-buttons-group';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordian from '../components/Accordioncompent';
import DateInput from '../components/DateInput2';
import user from '../utils/User';
var isDarkTheme = '';
export default function Blooddonation({ navigation }: any) {
  const theme = useColorScheme();

  if (theme !== 'light') {
    isDarkTheme = 'white';
    console.log('gf', isDarkTheme);
  }
  if (theme === 'light') {
    isDarkTheme = 'black';
    console.log('gf', isDarkTheme);
  }
  //to avoid using the side menu inside the login screen
  const { t, i18n } = useTranslation();
  navigation.setOptions({ headerShown: false, swipeEnabled: false });
  const [dateFrom, setDateFrom]: [Date | null, any] = useState(null);
  const [dateTo, setDateTo]: [Date | null, any] = useState(null);
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
        labelStyle: { fontSize: 18, color: '#1D5B8C' },
      },
      {
        id: '2',
        label: t('female'),
        value: 'female',
        color: '#1fab91',
        labelStyle: { fontSize: 18, color: '#1D5B8C' },
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
            height: '100%',
            width: '100%',
          }}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 20,

                marginLeft: 10,
                color: '#8DA9B6',
              }}>
              {t('namedonation')}
            </Text>
            <View style={styles.logoImgView}>
              <Image source={require('../assets/images/brr.png')} />
            </View>
            <Text
              style={{
                fontSize: 20,
                paddingBottom: 10,
                color: '#8DA9B6',
                marginLeft: 10,
              }}>
              {t('donation')}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.allInputs}>
                <View style={styles.inputView}>
                  {i18n.language === 'ar' && (
                    <TextInput
                      style={styles.inputText}
                      placeholder="الاسم الاول (الزامي)"
                      placeholderTextColor="black"
                      onChangeText={(text) => idValidation(text)}
                      value={id}
                      // start writing from the right side
                      textAlign="right"
                    />
                  )}
                  {i18n.language === 'en' && (
                    <TextInput
                      style={styles.inputText}
                      placeholder="First Name *"
                      placeholderTextColor="black"
                      onChangeText={(text) => idValidation(text)}
                      value={id}
                      // start writing from the right side
                      textAlign="left"
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
                      placeholder="اسم الجد الزامي"
                      placeholderTextColor="black"
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
                      placeholder="Grandfather is name *"
                      placeholderTextColor="black"
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
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                  <Accordian title={t('blood')} data={[]} />
                </View>
              </View>
              <View style={styles.allInputs2}>
                <View style={styles.inputView}>
                  {i18n.language === 'ar' && (
                    <TextInput
                      style={styles.inputText}
                      placeholder="اسم الاب الزامي"
                      placeholderTextColor="black"
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
                      placeholder="Father is Name"
                      placeholderTextColor="black"
                      secureTextEntry={securePassword1}
                      onChangeText={(text) => passwordValidation1(text)}
                      value={password1}
                      textAlign="left"
                      maxLength={30}
                    />
                  )}
                </View>
                {passwordError1 !== '' ? (
                  <Text style={styles.errorText}>{passwordError1}</Text>
                ) : null}
                <View style={styles.inputView}>
                  {i18n.language === 'ar' && (
                    <TextInput
                      style={styles.inputText}
                      placeholder="اللقب الزامي"
                      placeholderTextColor="black"
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
                      placeholder="End name"
                      placeholderTextColor="black"
                      secureTextEntry={securePassword2}
                      onChangeText={(text) => passwordValidation2(text)}
                      value={password2}
                      textAlign="left"
                      maxLength={30}
                    />
                  )}
                </View>
                {passwordError2 !== '' ? (
                  <Text style={styles.errorText}>{passwordError2}</Text>
                ) : null}
                <View style={{ marginLeft: 3, marginRight: 3 }}>
                  <Accordian title={t('gender2')} data={[]} />
                </View>
              </View>
            </View>
            <View style={styles.allInputs3}>
              <DateInput
                dateFrom={dateFrom}
                dateTo={dateTo}
                setDateTo={setDateTo}
                setDateFrom={setDateFrom}
              />
              <View style={{ margin: 10 }}>
                <Accordian title={t('Nationality')} data={[]} />
              </View>
            </View>
            <View style={styles.inputView22}>
              {i18n.language === 'ar' && (
                <TextInput
                  style={styles.inputText}
                  placeholder={t('id')}
                  placeholderTextColor="black"
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
                  placeholderTextColor="black"
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
                  placeholder="المهنه الزامي"
                  placeholderTextColor="black"
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
                  placeholder="Job *"
                  placeholderTextColor="black"
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
                  placeholder={t('phoneno')}
                  placeholderTextColor="black"
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
                  placeholderTextColor="black"
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
            <TouchableOpacity style={styles.loginBtn} onPress={handleSingup}>
              <Text style={styles.loginText}>{t('next')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn2} onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 50,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#124963',
  },
  inputView: {
    backgroundColor: '#fff',
    margin: 10,
    height: 50,
  },
  inputView22: {
    margin: 10,

    backgroundColor: '#fff',

    height: 50,
  },
  inputText: {
    height: 50,
    color: '#124963',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#00AE93',

    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn2: {
    width: '100%',

    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 25,
  },
  logoImgView: {
    alignItems: 'center',
    transform: [{ scale: 0.8 }],
  },
  allInputs: {},
  allInputs2: {
    width: 200,

    paddingLeft: 0,
  },
  allInputs3: {
    width: '100%',
  },
  titleImg: {
    alignItems: 'center',
    // modify the size of the image
    transform: [{ scale: 0.8 }],
  },
  scroll: {
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
