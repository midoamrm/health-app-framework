import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Callus({ navigation }: any) {
  //to avoid using the side menu inside the login screen
  const { t, i18n } = useTranslation();
  navigation.setOptions({ headerShown: false, swipeEnabled: false });

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
            backgroundColor: '#1D5B8C',
            height: '100%',
            width: '100%',
          }}>
          <View style={styles.container}>
            <View style={styles.logoImgView}>
              <Image
                style={{ width: 120, height: 120, borderRadius: 20 }}
                source={require('../assets/images/ii.png')}
              />
              <Text style={{ fontSize: 30 }}>{t('callus')}</Text>
              <Image
                style={{ width: 440, height: 220, borderRadius: 20 }}
                source={require('../assets/images/macc.png')}
              />
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome5
                  name={'map'}
                  size={20}
                  style={{ paddingTop: 35 }}
                />
                <View style={{ flexDirection: 'column', paddingLeft: 80 }}>
                  <Text style={{ fontSize: 25, paddingBottom: 15 }}>
                    {t('l1')}{' '}
                  </Text>
                  <Text style={{ fontSize: 25, paddingBottom: 15 }}>
                    {t('l2')}
                  </Text>
                  <Text style={{ fontSize: 25, paddingBottom: 10 }}>
                    {t('l3')}
                  </Text>
                </View>
              </View>
              <View style={styles.border} />
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome5
                  name={'hand'}
                  size={20}
                  style={{ paddingTop: 35 }}
                />
                <View style={{ flexDirection: 'column', paddingLeft: 80 }}>
                  <Text style={{ fontSize: 25, paddingBottom: 15 }}>
                    القلب ينشر عبير الشكر والوفاء والعرفان لك على كل ما بذلته في
                    سبيل أن نصل إلى ما طمحنا إليه جميعًا، فقد كان نجاحنا اليوم
                    ثمرة العمل المشترك الذي لم يكن ليتحقق لولا عملنا جميعاً في
                    مركب واحد، وهنا نحن نجونا جميعاً، فكل الشكر والعرفان لكم
                    أيها الأحبة.
                  </Text>
                </View>
              </View>
              <View style={styles.border} />
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome5 name={'phone'} size={20} />
                <View style={{ flexDirection: 'column', paddingLeft: 80 }}>
                  <Text style={{ fontSize: 25, paddingBottom: 15 }}>
                    {t('l4')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  border: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    width: '90%',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#D7EFEE',
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
