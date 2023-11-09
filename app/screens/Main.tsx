import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../assets/values/Colors';
import user from '../utils/User';

const CustomCard = ({ title, icons, onPress, ss }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardIcon}>{icons}</View>
      <Text
        style={{
          color: Colors.grey,
          fontSize: ss,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function MainScreen({ navigation }: any) {
  const { t } = useTranslation();

  const theme = useColorScheme();
  var vv = 20;
  var ss = 10;
  var dd = 40;
  var ll = 15;
  //const [vv, setvv] = useState(20);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('window');
  console.log('width', SCREEN_WIDTH);
  console.log('height', SCREEN_HEIGHT);
  console.log('pixelrito', PixelRatio.get());
  if (PixelRatio.get() <= 2) {
    vv = 50;
    ss = 20;
    dd = 60;
    ll = 20;
  }
  const cl = async () => {
    try {
      const value = await AsyncStorage.getItem('d');
      console.log(value);
      if (value === 'd') {
        // isDarkTheme = Colors.primary1;
        console.log('modeee', 'dark');
        navigation.navigate('Login', { itt: value });
      }
      if (value === 'l') {
        //  isDarkTheme = Colors.primary2;
        console.log('modeee', 'ligth');
        navigation.navigate('Login', { itt: value });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cl2 = async () => {
    try {
      const value = await AsyncStorage.getItem('d');
      console.log(value);
      if (value === 'd') {
        // isDarkTheme = Colors.primary1;
        console.log('modeee', 'dark');
        navigation.navigate('signup', { itt2: value });
      }
      if (value === 'l') {
        //  isDarkTheme = Colors.primary2;
        console.log('modeee', 'ligth');
        navigation.navigate('signup', { itt2: value });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(`user: ${user}`);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: vv,
            fontWeight: 'bold',
            padding: 20,
          }}>
          {t('main')}
        </Text>
        <View style={styles.cardContainer}>
          <CustomCard
            title={t('Medicaldepartments')}
            ss={ss}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large1.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('warning page')}
          />
          <CustomCard
            ss={ss}
            title={t('namedonation')}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large2.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('temp1')}
          />
          <CustomCard
            ss={ss}
            title={t('Myreferral')}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large3.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('warning page')}
          />
          <CustomCard
            ss={ss}
            title={t('Earlydetectionofbreasttumors')}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large4.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('warning page')}
          />
          <CustomCard
            ss={ss}
            title={t('Myexperience')}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large5.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('warning page')}
          />
          <CustomCard
            ss={ss}
            title={t('Instructions')}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large6.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('warning page')}
          />
          <CustomCard
            ss={ss}
            title={t('Formedicaleducation')}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large7.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('warning page')}
          />
          <CustomCard
            title={t('Visitor requests')}
            ss={ss}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large8.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('Resreve')}
          />
          <CustomCard
            title={t('Complaintsandsuggestions')}
            ss={ss}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large9.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('warning page')}
          />
          <CustomCard
            title={t('callus')}
            ss={ss}
            icons={
              <Image
                source={require('../assets/images/menu_icon_large10.png')}
                style={{ width: dd, height: dd, resizeMode: 'contain' }}
              />
            }
            onPress={() => navigation.navigate('Callus')}
          />
        </View>

        <>
          <View style={styles.user}>
            <Text
              style={{
                color: Colors.grey,
                fontSize: ll,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingHorizontal: 20,
                marginBottom: 20,
              }}>
              {t('use')}
            </Text>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                cl();
              }}>
              <Text style={styles.loginText}> {t('signin')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => cl2()}>
              <Text style={styles.loginText}> {t('create')}</Text>
            </TouchableOpacity>
          </View>
        </>
      </ScrollView>
      {/* {
        // use setTimout to show the message for 3 seconds then hide it
        <View style={{
          backgroundColor: connected ? 'green' : 'red',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          display: displayNetworkMessage ? 'flex' : 'none',
        }}>
          <Text style={{
            color: 'white',
            fontSize: 15,
            fontWeight: 'bold',
          }}>{connected ? 'تم الاتصال بالانترنت' : 'فشل في الاتصال بالانترنت'}</Text>
        </View>
      }
      <Modal isVisible={!connected} style={styles.mainModel}>
        <View style={styles.failureContent}>
          <MaterialIcons name="signal-wifi-connected-no-internet-4" size={100} color="white" />
          <Text style={styles.popupTitle}>فشل في الاتصال بالانترنت!!</Text>
          <Text style={styles.popupSubTitle}>
            من فضلك اعد الاتصال بالانترنت وحاول مرة اخرى
          </Text>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  text: {
    color: Colors.primary1,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  card: {
    margin: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    width: '30%',
    height: 110,
  },
  cardIcon: {
    // padding: 10,
    // borderRadius: 10,
    // margin: 10,
  },
  cardTitle: {
    color: Colors.grey,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: Colors.secondary1,
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
  },
  infoText: {
    color: Colors.grey,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mainModel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  failureContent: {
    backgroundColor: '#D50000',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    width: '95%',
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
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
const list = [
  'الاقسام الطبية',
  'التبرع بالدم والصفائح الدموية',
  'احالتي',
  'الكشف المبكر لأورام الثدي',
  'تجربتي',
  'التعليمات والارشادات',
  'التثقيف الطبي',
  'طلبات الزوار',
  'الشكاوى والاقتراحات',
  'اتصل بنا',
];
