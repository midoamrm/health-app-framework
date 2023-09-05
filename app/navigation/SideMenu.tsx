import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
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
import Cache from '../screens/cacheing';
import Cruddb from '../screens/Cruddb';
import LabResultsScreen from '../screens/LabResults';
import Language from '../screens/Language';
import Update from '../screens/update';

import SignupScreen from '../screens/Signup';
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
      <View style={{ width: 200 }}>
        <Text style={{ color: Colors.white, textAlign: 'right' }}>
          {user_?.displayName ?? user.name}
        </Text>
        <Text style={{ color: Colors.white }}>
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

export default function SideMenu(): JSX.Element {
  const { t } = useTranslation();
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
            color: Colors.primary1,
          },
          headerLeft: () => (
            <CustomHeaderIcon onPress={navigation.openDrawer} />
          ),
          headerRight: () => <ProfileInfo />,
          sceneContainerStyle: {
            backgroundColor: Colors.primary2,
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
          name={'Login'}
          component={LoginScreen}
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name={'Otp'}
          component={OtpScreen}
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
          name={'LabResultsScreen'}
          component={LabResultsScreen}
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
          name={'Update'}
          component={Update}
          options={{
            drawerItemStyle: { display: 'none' },
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
