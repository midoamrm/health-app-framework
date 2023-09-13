import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/values/Colors';
const Vsion = ({ navigation, route }) => {
  const [pressed, setPressed] = useState(false);
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
            },
            true
              ? { backgroundColor: Colors.primary2 }
              : { backgroundColor: Colors.primary1 },
          ]}
          onPress={() => {
            setPressed(true);
            navigation.navigate('Tabs');
          }}>
          <Text style={[styles.tabText, true ? {} : { color: Colors.white }]}>
            الخدمات
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { width: '32%', borderRadius: 7 },
            false
              ? { backgroundColor: Colors.primary2 }
              : { backgroundColor: Colors.primary1 },
          ]}
          onPress={() => {
            setPressed(false);
          }}>
          <Text style={[styles.tabText, false ? {} : { color: Colors.white }]}>
            عن المركز
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { width: '32%', borderRadius: 7 },
            true
              ? { backgroundColor: Colors.primary2 }
              : { backgroundColor: Colors.primary1 },
          ]}
          onPress={() => {
            setPressed(false);
            navigation.navigate('Doc');
          }}>
          <Text style={[styles.tabText, true ? {} : { color: Colors.white }]}>
            الاطباء
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}> الرويه</Text>
      <View style={{ borderRadius: 7, borderColor: 'black' }}>
        <Text style={styles.text2}>
          {' '}
          توفير منظومة صحية متطورة و متكاملة تعزز صحة الفرد و المجتمع و تقدم
          الخدمات الصحية الوقائية و العلاجية و التأهيلية و التلطيفية الآمنة و
          الشاملة بعدالة و جودة و كفاءة ،و القيام بالدور التنظيمي و الرقابي على
          الخدمات المرتبطة بصحة و سلامة السكان و بشراكة فاعلة مع الجهات ذات
          العلاقة وصولاً الى التغطية الصحية الشاملة
        </Text>
      </View>
    </View>
  );
};
export default Vsion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary2,
  },
  text: {
    color: Colors.primary1,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  text2: {
    color: Colors.primary1,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 20,
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
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
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
