import auth from '@react-native-firebase/auth';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../assets/values/Colors';
import user from '../utils/User';
const CustomDrawer = (props) => {
  const navigation = useNavigation();
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
                الشكاوى والاقتراحات
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Callus');
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
                اتصل بنا
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
                تبديل الوان الوجهة
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              paddingTop: 30,
              paddingHorizontal: 40,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <View>
                <Image
                  source={require('../assets/images/menu_style_icon1.png')}
                />
                {/* <Badge
                  status="success"
                  containerStyle={{position: 'absolute', top: -4, right: -4}}
                /> */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Image
                  source={require('../assets/images/menu_style_icon2.png')}
                />
                <Badge
                  value="✔"
                  badgeStyle={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                  }}
                  status="success"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              </View>
            </TouchableOpacity>
          </View>
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
            تسجيل دخول
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
            تسجيل خروج
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default CustomDrawer;
