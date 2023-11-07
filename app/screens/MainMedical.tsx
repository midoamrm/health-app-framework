import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../assets/values/Colors';
import { CustomCard } from '../components/Index';
const Tab = createBottomTabNavigator();
var isDarkTheme = 'd';
export default function MedicalServicesScreen({ navigation, route }: any) {
  const { t, i18n } = useTranslation();

  //const item = route.params.itx;
  //isDarkTheme = item;
  // need to set text dark mode

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: Colors.primary1,
        tabBarInactiveTintColor: Colors.grey,
      }}>
      <Tab.Screen
        name="MyCalender"
        component={MyCalender}
        options={{
          title: t('cla'),
          tabBarIcon: ({ color, size }: any) => (
            <FontAwesome5 name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={MedicalServicesContent}
        options={{
          title: t('Home'),
          tabBarIcon: ({ color, size }: any) => (
            <FontAwesome5 name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('file'),
          tabBarIcon: ({ color, size }: any) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MedicalServicesContent({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          isDarkTheme === 'l' ? Colors.primary2 : Colors.primary1,
      }}>
      <ScrollView>
        <Text style={styles.text}>{t('services')}</Text>
        <View style={styles.cardContainer}>
          <CustomCard
            title={t('reports')}
            icons={
              <Image
                source={require('../assets/images/medical_icon1.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('MedicalServices')}
          />

          <CustomCard
            title={t('Reports2')}
            icons={
              <Image
                source={require('../assets/images/medical_icon2.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('MedicalServices')}
          />
          <CustomCard
            title={t('Pharmacy')}
            icons={
              <Image
                source={require('../assets/images/medical_icon3.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('MedicalServices')}
          />
          <CustomCard
            title={t('Appointments')}
            icons={
              <Image
                source={require('../assets/images/medical_icon4.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('MedicalServices')}
          />
          <CustomCard
            title={t('Laboratoryresults')}
            icons={
              <Image
                source={require('../assets/images/medical_icon5.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('LabResultsStack')}
          />
          <CustomCard
            title={t('myorder')}
            icons={
              <Image
                source={require('../assets/images/medical_icon6.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('MedicalServices')}
          />
          <CustomCard
            title={t('Socialproblemsolving')}
            icons={
              <Image
                source={require('../assets/images/medical_icon7.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('MedicalServices')}
          />
          <CustomCard
            title={t('Boardingaccommodation')}
            icons={
              <Image
                source={require('../assets/images/medical_icon8.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('MedicalServices')}
          />
          <CustomCard
            title={t('Transportationrequest')}
            icons={
              <Image
                source={require('../assets/images/medical_icon9.png')}
                style={styles.image}
              />
            }
            onPress={() => navigation.navigate('MedicalServices')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
function MyCalender() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          isDarkTheme === 'l' ? Colors.primary2 : Colors.primary1,
      }}>
      <Text style={styles.text}>{t('cla')}</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          isDarkTheme === 'l' ? Colors.primary2 : Colors.primary1,
      }}>
      <Text style={styles.text}> {t('file')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
});
const list = [
  'التقارير',
  'الصيدلية',
  'المواعيد',
  'ذكرني',
  'النتائج المخبرية',
  'طلباتي',
  'حل مشكلة اجتماعية',
  'سكن داخلي',
  'طلب مواصلات',
];
