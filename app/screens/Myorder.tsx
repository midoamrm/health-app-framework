import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Colors from '../assets/values/Colors';
import Accordian from '../components/Accordioncompent';
import { DateInput } from '../components/Index';
var isDarkTheme = '';
export default function Myorder({ navigation, route }: any) {
  const theme = useColorScheme();

  if (theme !== 'light') {
    isDarkTheme = 'white';
    console.log('gf', isDarkTheme);
  }
  if (theme === 'light') {
    isDarkTheme = 'black';
    console.log('gf', isDarkTheme);
  }
  /* route.params.nav.setOptions({
    headerShown: true,
    headerLeft: () => <CustomHeaderIcon onPress={navigation.openDrawer} />,
    swipeEnabled: true,
  });*/
  const { t, i18n } = useTranslation();
  const [dateFrom, setDateFrom]: [Date | null, any] = useState(null);
  const [dateTo, setDateTo]: [Date | null, any] = useState(null);
  const [filteredData, setFilteredData]: [any, any] = useState([]);
  const [pressed, setPressed] = useState(false);
  const filterData = () => {
    if (dateFrom && dateTo) {
      const prevDay = new Date(dateFrom);
      prevDay.setDate(prevDay.getDate() - 1);
      const filteredData = data.filter((item: any) => {
        return (
          item.date >= prevDay &&
          item.date <= dateTo &&
          item.official === !pressed
        );
      });
      setFilteredData(filteredData);
    }
  };
  useEffect(() => {
    filterData();
  }, [pressed]);

  const CustomListCardItem = ({ item }: any) => {
    const date = item.date;
    const text = item.text;
    const status = item.r;
    const color = item.c;
    const formattedDate = date
      .toLocaleDateString('ar-EG-u-nu-latn', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      .replace('،', '');
    const dateElements = formattedDate.split(' ');
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LabResultsMasterDetails', { item });
        }}>
        <View style={styles.listItem}>
          <View
            style={{
              width: '20%',
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 10,
                color: Colors.primary1,
                textAlign: 'center',
                fontWeight: 'bold',
                padding: 2,
              }}>
              {dateElements[0]}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: Colors.primary1,
                borderBottomColor: Colors.primary1,
                borderBottomWidth: 2,
                textAlign: 'center',
                fontWeight: 'bold',
                padding: 2,
              }}>
              {dateElements[1]}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: Colors.primary1,
                textAlign: 'center',
                fontWeight: 'bold',
                padding: 2,
              }}>
              {dateElements[2]}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: Colors.primary1,
                textAlign: 'center',
                fontWeight: 'bold',
                padding: 2,
              }}>
              {dateElements[3]}
            </Text>
          </View>
          <View
            style={{
              borderLeftWidth: 5,
              borderRadius: 5,
              borderColor: color,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '80%',
              height: '100%',
              paddingHorizontal: 20,
            }}>
            <Text style={{ color: Colors.primary1, fontWeight: 'bold' }}>
              {text}
            </Text>
            <Text style={{ color: Colors.primary1, fontWeight: 'bold' }}>
              {status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            color: '#8DA9B6',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 20,
          }}>
          {t('myorder')}
        </Text>
        <DateInput
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          setDateFrom={setDateFrom}
        />
        <View style={{ margin: 10 }}>
          <Accordian title={t('orderkind')} data={[]} />
        </View>

        <View style={{ margin: 10 }}>
          <Accordian title={t('statuskind')} data={[]} />
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.searchBtn} onPress={filterData}>
            <Text style={styles.searchText}>{t('search')}</Text>
          </TouchableOpacity>
          <View style={styles.border} />

          <View style={styles.listContainer}>
            <FlatList
              data={filteredData}
              keyExtractor={(item: any) => item.id}
              renderItem={CustomListCardItem}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  text: {
    color: 'black',
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
    fontSize: 15,
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

const data = [
  {
    id: 1,
    date: new Date('2021-05-01'),
    text: ' طلب توصيل الادويه',
    description: 'هذه هي النتيجة الأولى',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 1',
    field2: 'بيانات الحقل 2 للعنصر 1',
    r: 'تم رفض الطلب',
    c: 'red',
  },
  {
    id: 2,
    date: new Date('2021-05-01'),
    text: 'طلب تقرير طبي',
    description: 'هذه هي النتيجة الثانية',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 2',
    field2: 'بيانات الحقل 2 للعنصر 2',
    r: 'تم قبول الطلب',
    c: 'green',
  },
  {
    id: 3,
    date: new Date('2021-05-02'),
    text: 'طلب اضافه موعد عياده',
    description: 'هذه هي النتيجة الثالثة',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 3',
    field2: 'بيانات الحقل 2 للعنصر 3',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 4,
    date: new Date('2021-05-03'),
    text: 'طلب اضافه موعدعياده',
    description: 'هذه هي النتيجة الرابعة',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 4',
    field2: 'بيانات الحقل 2 للعنصر 4',
    r: 'طلب تحت المعالحه',
    c: 'yellow',
  },
  {
    id: 5,
    date: new Date('2021-05-04'),
    text: 'طلب تقرير طبي',
    description: 'هذه هي النتيجة الخامسة',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 5',
    field2: 'بيانات الحقل 2 للعنصر 5',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 6,
    date: new Date('2021-05-05'),
    text: 'نتيجة 6',
    description: 'هذه هي النتيجة السادسة',
    official: false,
    field1: 'بيانات الحقل 1 للعنصر 6',
    field2: 'بيانات الحقل 2 للعنصر 6',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 7,
    date: new Date('2021-05-06'),
    text: 'نتيجة 7',
    description: 'هذه هي النتيجة السابعة',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 7',
    field2: 'بيانات الحقل 2 للعنصر 7',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 8,
    date: new Date('2021-05-07'),
    text: 'نتيجة 8',
    description: 'هذه هي النتيجة الثامنة',
    official: false,
    field1: 'بيانات الحقل 1 للعنصر 8',
    field2: 'بيانات الحقل 2 للعنصر 8',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 9,
    date: new Date('2021-05-08'),
    text: 'نتيجة 9',
    description: 'هذه هي النتيجة التاسعة',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 9',
    field2: 'بيانات الحقل 2 للعنصر 9',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 10,
    date: new Date('2021-05-09'),
    text: 'نتيجة 10',
    description: 'هذه هي النتيجة العاشرة',
    official: false,
    field1: 'بيانات الحقل 1 للعنصر 10',
    field2: 'بيانات الحقل 2 للعنصر 10',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 11,
    date: new Date('2021-05-10'),
    text: 'نتيجة 11',
    description: 'هذه هي النتيجة الحادية عشر',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 11',
    field2: 'بيانات الحقل 2 للعنصر 11',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 12,
    date: new Date('2021-05-11'),
    text: 'نتيجة 12',
    description: 'هذه هي النتيجة الثانية عشر',
    official: false,
    field1: 'بيانات الحقل 1 للعنصر 12',
    field2: 'بيانات الحقل 2 للعنصر 12',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 13,
    date: new Date('2021-05-12'),
    text: 'نتيجة 13',
    description: 'هذه هي النتيجة الثالثة عشر',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 13',
    field2: 'بيانات الحقل 2 للعنصر 13',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 14,
    date: new Date('2021-05-13'),
    text: 'نتيجة 14',
    description: 'هذه هي النتيجة الرابعة عشر',
    official: false,
    field1: 'بيانات الحقل 1 للعنصر 14',
    field2: 'بيانات الحقل 2 للعنصر 14',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 15,
    date: new Date('2021-05-14'),
    text: 'نتيجة 15',
    description: 'هذه هي النتيجة الخامسة عشر',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 15',
    field2: 'بيانات الحقل 2 للعنصر 15',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 16,
    date: new Date('2021-05-15'),
    text: 'نتيجة 16',
    description: 'هذه هي النتيجة السادسة عشر',
    official: false,
    field1: 'بيانات الحقل 1 للعنصر 16',
    field2: 'بيانات الحقل 2 للعنصر 16',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 17,
    date: new Date('2021-05-16'),
    text: 'نتيجة 17',
    description: 'هذه هي النتيجة السابعة عشر',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 17',
    field2: 'بيانات الحقل 2 للعنصر 17',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 18,
    date: new Date('2021-05-17'),
    text: 'نتيجة 18',
    description: 'هذه هي النتيجة الثامنة عشر',
    official: false,
    field1: 'بيانات الحقل 1 للعنصر 18',
    field2: 'بيانات الحقل 2 للعنصر 18',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 19,
    date: new Date('2021-05-18'),
    text: 'نتيجة 19',
    description: 'هذه هي النتيجة التاسعة عشر',
    official: true,
    field1: 'بيانات الحقل 1 للعنصر 19',
    field2: 'بيانات الحقل 2 للعنصر 19',
    r: 'طلب جديد',
    c: 'brown',
  },
  {
    id: 20,
    date: new Date('2021-05-19'),
    text: 'نتيجة 20',
    description: 'هذه هي النتيجة العشرون',
    official: false,
    field1: 'بيانات الحقل 1 للعنصر 20',
    field2: 'بيانات الحقل 2 للعنصر 20',
    r: 'طلب جديد',
    c: 'brown',
  },
];
