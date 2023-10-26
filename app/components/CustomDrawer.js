import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNRestart from 'react-native-restart';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../assets/values/Colors';
import user from '../utils/User';

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const dark = async () => {
    try {
      setKey('d');
      setValue('d');
      //  await AsyncStorage.removeItem('d');
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
    RNRestart.Restart();
  };
  const ligth = async () => {
    try {
      setKey('d');
      setValue('l');
      //   await AsyncStorage.removeItem('d');
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
    RNRestart.Restart();
  };
  const cl = async () => {
    try {
      const value = await AsyncStorage.getItem('d');
      console.log(value);
      if (value === 'd') {
        // isDarkTheme = Colors.primary1;
        console.log('modeee', 'dark');
        navigation.navigate('Callus', { itt3: value });
      }
      if (value === 'l') {
        //  isDarkTheme = Colors.primary2;
        console.log('modeee', 'ligth');
        navigation.navigate('Callus', { itt3: value });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary2 }}>
      <View
        style={{
          backgroundColor: Colors.primary1,
          padding: 20,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Language');
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="globe" size={22} color={Colors.white} />
            <Text style={{ color: Colors.white, paddingHorizontal: 20 }}>
              English
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          {i18n.language === 'ar' && (
            <FontAwesome5
              name={'arrow-left'}
              size={20}
              color={'white'}
              onPress={() => {}}
            />
          )}
          {i18n.language === 'en' && (
            <FontAwesome5
              name={'arrow-right'}
              size={20}
              color={'white'}
              onPress={() => {}}
            />
          )}
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.primary2 }}>
        <View
          style={{ flex: 1, backgroundColor: Colors.primary2, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: Colors.secondary1,
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/menu_icon9.png')} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  fontWeight: 'bold',
                  color: Colors.primary1,
                }}>
                {t('Complaintsandsuggestions')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              cl();
            }}
            style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/menu_icon10.png')} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  fontWeight: 'bold',
                  color: Colors.primary1,
                }}>
                {t('callus')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: Colors.secondary1,
            }}
          />
        </View>
        <View
          style={{
            padding: 20,
          }}>
          <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/menu_icon11.png')} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  fontWeight: 'bold',
                  color: Colors.primary1,
                }}>
                {t('Changedestinationcolors')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          backgroundColor: Colors.primary1,
          padding: 20,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            // TODO: logout function should be defined in another file to avoid redundancy
            if (auth().currentUser) {
              auth().signOut();
              RNRestart.Restart();
            } else {
              user.clear();
            }

            navigation.navigate('MainScreen');
          }}>
          <FontAwesome5 name="sign-out-alt" size={22} color={Colors.white} />
          <Text
            style={{
              color: Colors.white,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {t('signout')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default CustomDrawer;
