import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/values/Colors';
const Tabs = ({ navigation, route }) => {
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
              height: '100%',
            },
            false
              ? { backgroundColor: Colors.primary2 }
              : { backgroundColor: Colors.primary1 },
          ]}
          onPress={() => {
            setPressed(true);
          }}>
          <Text style={[styles.tabText, false ? {} : { color: Colors.white }]}>
            الخدمات
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
            عن المركز
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
            الاطباء
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}> الخدمات</Text>
      <View style={{ borderRadius: 7, borderColor: 'black' }}>
        <Text style={styles.text2}>
          {' '}
          مركز الأورام بمدينة الملك فهد الطبية هو أحد المراجع الرئيسية لمرضى
          الدم والأورام بوزارة الصحة، حيث يستقبل هذا المركز جميع المرضى من جميع
          أنحاء المملكة العربية السعودية لتلقي العلاج والمتابعة الدورية.
        </Text>
        <Text style={styles.text2}>
          {' '}
          وبدأ المركز في شهر جمادى الآخرة 1425 هـ الموافق شهر يونيو 2004، ومنُح
          أول علاج كيميائي عن طريق الوريد في شهر رمضان من نفس العام.
        </Text>
        <Text style={styles.text2}>
          {' '}
          وكان قادراً على تغطية جزء كبير من أمراض الدم والأورام بالإضافة إلى
          العلاج الإشعاعي والعلاج التلطيفي، ولقد ساهم مركز الأورام الشامل في
          تطوير الاستراتيجية الوطنية للسرطان بالتعاون مع وزارة الصحه
        </Text>
        <Text style={styles.text2}> -تم اضافه خدمات الجينات الوراثيه</Text>
        <Text style={styles.text2}> يضم مركز الأورام عدد من الاقسام</Text>
        <Text style={styles.text3}>قسم الطب التلطيفي.</Text>
        <Text style={styles.text3}>قسم العلاج بالأشعة.</Text>
        <Text style={styles.text3}>شعبة الفيزياء الطبية.</Text>
        <Text style={styles.text3}>وحدة العلاج بالأشعة.</Text>
        <Text style={styles.text3}>قسم أورام الدم وأورام الأطفال.</Text>
      </View>
    </View>
  );
};
export default Tabs;

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
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  text4: {
    color: Colors.primary1,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  text3: {
    color: Colors.primary1,
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
    fontSize: 14,
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
