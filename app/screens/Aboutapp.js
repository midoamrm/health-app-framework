import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Colors from '../assets/values/Colors';
var isDarkTheme = '';
const Tabs = ({ navigation, route }) => {
  const theme = useColorScheme();

  if (theme !== 'light') {
    isDarkTheme = '#FFFFFF';
    console.log('gf', isDarkTheme);
  }
  if (theme === 'light') {
    isDarkTheme = Colors.primary1;
    console.log('gf', isDarkTheme);
  }
  const [pressed, setPressed] = useState(false);
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: 10,
          marginTop: 30,
          marginHorizontal: 20,
          borderColor: Colors.primary1,
        }}>
        <TouchableOpacity
          style={[
            {
              borderRadius: 7,
              width: '36%',
              height: '100%',
            },
            false
              ? { backgroundColor: Colors.primary2 }
              : { backgroundColor: '#007bff' },
          ]}
          onPress={() => {
            setPressed(true);
          }}>
          <Text style={[styles.tabText, false ? {} : { color: Colors.white }]}>
            {t('servies')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { width: '32%', borderRadius: 7, height: '100%' },
            true
              ? { backgroundColor: Colors.primary2 }
              : { backgroundColor: Colors.primary1 },
          ]}
          onPress={() => {
            setPressed(false);
            navigation.navigate('Vsion');
          }}>
          <Text style={[styles.tabText, true ? {} : { color: Colors.white }]}>
            {t('aboutcenter')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { width: '32%', borderRadius: 7, height: '100%' },
            true
              ? { backgroundColor: Colors.primary2 }
              : { backgroundColor: Colors.primary1 },
          ]}
          onPress={() => {
            setPressed(false);
            navigation.navigate('Doc');
          }}>
          <Text style={[styles.tabText, true ? {} : { color: Colors.white }]}>
            {t('Doctors')}
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#8DA9B6',
          fontSize: 20,
          fontWeight: 'bold',
          padding: 20,
        }}>
        {t('servies')}
      </Text>
      <View style={{ borderRadius: 7, borderColor: 'black' }}>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 14,
            fontWeight: 'bold',
            padding: 10,
          }}>
          {' '}
          <Text style={{ fontSize: 14 }}> {t('F1')}</Text>
          <Text style={{ fontSize: 14 }}> {t('F2')}</Text>
          <Text style={{ fontSize: 14 }}> {t('F3')} </Text>.
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 14,
            fontWeight: 'bold',
            padding: 10,
          }}>
          {' '}
          <Text style={{ fontSize: 14 }}> {t('F4')} </Text>
          <Text style={{ fontSize: 14 }}> {t('F5')} </Text>
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 14,
            fontWeight: 'bold',
            padding: 10,
          }}>
          {' '}
          <Text style={{ fontSize: 14 }}> {t('F6')}</Text>
          <Text style={{ fontSize: 14 }}> {t('F7')}</Text>
          <Text style={{ fontSize: 14 }}> {t('F8')} </Text>
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 14,
            fontWeight: 'bold',
            padding: 10,
          }}>
          {' '}
          {t('p1')}
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 14,
            fontWeight: 'bold',
            padding: 10,
          }}>
          {' '}
          {t('p2')}
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 5,
          }}>
          {' '}
          {t('p3')}
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 5,
          }}>
          {' '}
          {t('p4')}
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 5,
          }}>
          {' '}
          {t('p5')}
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 5,
          }}>
          {' '}
          {t('p6')}
        </Text>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 5,
          }}>
          {' '}
          {t('p7')}
        </Text>
      </View>
    </View>
  );
};
export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  text2: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  text4: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  text3: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  searchBtn: {
    backgroundColor: Colors.secondary1,
    borderRadius: 15,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  infoText: {
    color: Colors.grey,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabText: {
    color: Colors.primary1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
    height: 100,
  },
  border: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1.5,
    width: '90%',
    marginVertical: 10,
  },
});
