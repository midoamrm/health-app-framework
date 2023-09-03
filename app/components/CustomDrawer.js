import auth from '@react-native-firebase/auth';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../assets/values/Colors';
import user from '../utils/User';
const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  console.log(user.loggedIn);
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
              AR/EN
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
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
          }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: Colors.secondary1,
            }}
          />
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
            navigation.navigate('Login');
          }}>
          <FontAwesome5 name="sign-in-alt" size={22} color={Colors.white} />
          <Text
            style={{
              color: Colors.white,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {t('signin')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            // TODO: logout function should be defined in another file to avoid redundancy
            if (auth().currentUser) {
              auth().signOut();
            } else {
              user.clear();
            }

            navigation.navigate('MainScreen');
          }}>
          <FontAwesome5 name="sign-in-alt" size={22} color={Colors.white} />
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
