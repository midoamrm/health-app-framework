import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../assets/values/Colors';
import { CustomDrawer, CustomHeaderIcon } from '../components';
import {
  LoginScreen,
  MainScreen,
  MedicalServicesScreen,
  OtpScreen,
} from '../screens';
import Blooddonation from '../screens/BloodDonation';
import Cache from '../screens/cacheing';
import Callus from '../screens/Callus';
import Cruddb from '../screens/Cruddb';
import Daterecord from '../screens/Datercord';
import Doc from '../screens/Doc';
import LabResultsScreen from '../screens/LabResults';
import LabResultsMasterDetails from '../screens/LabResultsMasterDetails';
import Labresultsol1 from '../screens/labresultssol1';
import Language from '../screens/Language';
import Llist from '../screens/List';
import MedicalSessionScreen from '../screens/Medicalsession';
import Myorder from '../screens/Myorder';
import Resreve2 from '../screens/resreve';
import SignupScreen from '../screens/Signup';
import Tabs from '../screens/Tabspages';
import Resreve from '../screens/Todolist';
import Update from '../screens/update';
import Vsion from '../screens/Vsion';
import user from '../utils/User';
import LabResultsStack from './LabResultsStack';
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Home</Text>
    </SafeAreaView>
  );
}

const ProfileInfo = () => {
  const user_ = auth().currentUser;
  if (!user_ && !user.loggedIn) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
      <View style={{ width: 200, flexDirection: 'column' }}>
        <Text style={{ color: Colors.white, textAlign: 'right' }}>
          {user_?.displayName ?? user.name}
        </Text>
        <Text style={{ color: Colors.white, textAlign: 'right' }}>
          {user_?.phoneNumber ?? user.phoneNum}
        </Text>
      </View>
      <Image
        source={
          user_?.photoURL
            ? { uri: user_?.photoURL }
            : require('../assets/images/php.webp')
        }
        style={{
          resizeMode: 'contain',
          width: 50,
          height: 50,
          borderRadius: 25,
          marginHorizontal: 10,
        }}
      />
    </View>
  );
};
var isDarkTheme = '';

export default function SideMenu(): JSX.Element {
  const { t, i18n } = useTranslation();
  const theme = useColorScheme();

  if (theme !== 'light') {
    isDarkTheme = Colors.primary1;
    console.log('gf', isDarkTheme);
  }
  if (theme === 'light') {
    isDarkTheme = Colors.primary2;
    console.log('gf', isDarkTheme);
  }
  useEffect(() => {}, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props: any) => <CustomDrawer {...props} />}
        initialRouteName="MainScreen"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.primary1,
            height: 80,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerShown: true,

          drawerActiveBackgroundColor: Colors.primary2,
          drawerActiveTintColor: Colors.primary1,
          drawerInactiveTintColor: Colors.primary1,
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 15,
            fontWeight: 'bold',
          },
          headerTitleStyle: {
            color: Colors.primary2,
          },
          headerLeft: () => (
            <CustomHeaderIcon onPress={navigation.openDrawer} />
          ),
          headerRight: () => <ProfileInfo />,
          sceneContainerStyle: {
            backgroundColor: isDarkTheme,
          },
        })}>
        <Drawer.Screen
          name={'MainScreen'}
          component={MainScreen}
          options={{
            title: t('main'),
            drawerIcon: () => (
              <FontAwesome5
                name="home"
                size={22}
                color={Colors.primary1}
                style={{ paddingRight: 5 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={'LabResultsMasterDetails'}
          component={LabResultsMasterDetails}
          options={{
            title: 'LabResultsMasterDetails',
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <FontAwesome5
                name="home"
                size={22}
                color={Colors.primary1}
                style={{ paddingRight: 5 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={'Login'}
          component={LoginScreen}
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name={t('Medicaldepartments')}
          component={MedicalSessionScreen}
          options={{
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon1.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'Otp'}
          component={OtpScreen}
          options={{
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <FontAwesome5
                name="home"
                size={22}
                color={Colors.primary1}
                style={{ paddingRight: 5 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={'signup'}
          component={SignupScreen}
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name={'MedicalServices'}
          component={MedicalServicesScreen}
          options={{
            title: t('medicalservices'),
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon1.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'Cache'}
          component={Cache}
          options={{
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <FontAwesome5
                name="home"
                size={22}
                color={Colors.primary1}
                style={{ paddingRight: 5 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={'Language'}
          component={Language}
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name={'Cruddb'}
          component={Cruddb}
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name={'LabResultsStack'}
          component={LabResultsStack}
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name={t('Laboratoryresults')}
          component={LabResultsScreen}
          options={{
            drawerItemStyle: { display: 'ok' },
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon1.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={t('myorder')}
          component={Myorder}
          options={{
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon1.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={t('Recordappointments')}
          component={Daterecord}
          options={{
            drawerItemStyle: { display: 'ok' },
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon1.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={t('list')}
          component={Llist}
          options={{
            drawerItemStyle: { display: 'ok' },
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon1.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'Update'}
          component={Update}
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name={t('onemilonsol')}
          component={Labresultsol1}
          options={{
            drawerItemStyle: { display: 'ok' },
            drawerIcon: () => (
              <FontAwesome5
                name="home"
                size={22}
                color={Colors.primary1}
                style={{ paddingRight: 5 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Callus"
          component={Callus}
          options={{
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <FontAwesome5
                name="phone"
                size={22}
                color={Colors.primary1}
                style={{ paddingRight: 5 }}
              />
            ),
          }}
        />

        <Drawer.Screen
          name={'Tabs'}
          component={Tabs}
          options={{
            title: t('oboutapp'),
            drawerItemStyle: { display: 'ok' },
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon9.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'Vsion'}
          component={Vsion}
          options={{
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <FontAwesome5
                name="home"
                size={22}
                color={Colors.primary1}
                style={{ paddingRight: 5 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={'Doc'}
          component={Doc}
          options={{
            drawerItemStyle: { display: 'none' },
            drawerIcon: () => (
              <FontAwesome5
                name="home"
                size={22}
                color={Colors.primary1}
                style={{ paddingRight: 5 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={'temp1'}
          component={Blooddonation}
          options={{
            title: t('namedonation'),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon2.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'temp3'}
          component={Home}
          options={{
            title: t('Myreferral'),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon3.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'temp4'}
          component={Home}
          options={{
            title: t('Earlydetectionofbreasttumors'),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon4.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'temp5'}
          component={Home}
          options={{
            title: t('Myexperience'),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon5.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'temp6'}
          component={Home}
          options={{
            title: t('Instructions'),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon6.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'temp7'}
          component={Home}
          options={{
            title: t('Formedicaleducation'),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon7.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'temp8'}
          component={Myorder}
          options={{
            title: t('myorder'),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon8.png')} />
            ),
          }}
        />

        <Drawer.Screen
          name={'Resreve'}
          component={Resreve}
          options={{
            title: t('حجز العيادات'),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon8.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name={'Resreve2'}
          component={Resreve2}
          options={{
            title: t('حجز '),
            drawerIcon: () => (
              <Image source={require('../assets/images/menu_icon8.png')} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const list = [
  'الاقسام الطبية',
  'التبرع بالدم والصفائح الدموية',
  'احالتي',
  'الكشف المبكر لأورام الثدي',
  'تجربتي',
  'التعليمات والارشادات',
  'التثقيف الطبي',
  'طلبات الزوار',
];

const styles = StyleSheet.create({
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
});
