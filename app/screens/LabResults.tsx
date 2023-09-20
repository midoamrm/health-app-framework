import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../assets/values/Colors';
import { DateInput } from '../components';
export default function LabResultsScreen({ navigation, route }: any) {
  /*  route.params.nav.setOptions({
    headerShown: true,
    headerLeft: () => <CustomHeaderIcon onPress={navigation.openDrawer} />,
    swipeEnabled: true,
  });*/
  const { t, i18n } = useTranslation();
  var data: any[] = [];
  var datagen: any[] = [];
  var tempdata: any[] = [];
  const [APIData, setAPIData] = useState([]);
  const [dateFrom, setDateFrom]: [Date | null, any] = useState(null);
  const [dateTo, setDateTo]: [Date | null, any] = useState(null);
  const [filteredData, setFilteredData]: [any, any] = useState([]);
  const [pressed, setPressed] = useState(false);
  const updateAPIData = () => {
    axios.put(`https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata/${1}`, {
      date: '2021-05-01',
      text: 'result' + 3,
      description: 3 + 'th result',
      official: true,
      field1: 'data field' + 3 + 'for element  1 ',
      field2: 'data field' + 3 + 'for element  1 ',
    });
  };
  const postData = () => {
    axios.post('https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata', {
      datagen,
    });
    console.log('fggg');
  };
  // search bar need to done
  const genData = () => {
    for (let i = 0; i < 3; i++) {
      var obj = {
        date: '2021-05-01',
        text: 'result' + i,
        description: i + 'th result',
        official: true,
        field1: 'data field' + i + 'for element  1 ',
        field2: 'data field' + i + 'for element  1 ',
      };
      axios.post('https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata', {
        date: '2021-05-01',
        text: 'result' + i,
        description: i + 'th result',
        official: true,
        field1: 'data field' + i + 'for element  1 ',
        field2: 'data field' + i + 'for element  1 ',
      });
      // datagen.push(obj);
    }
    return datagen;
    //   console.log('datagen', datagen);
  };

  const getData = () => {
    axios
      .get('https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata')
      .then((response) => {
        setAPIData(response.data);
      });
    // console.log(APIData);
  };
  const filterData = () => {
    getData();
    data = APIData;
    //console.log(data);
    if (dateFrom && dateTo) {
      const prevDay = new Date(dateFrom);
      prevDay.setDate(prevDay.getDate() - 1);
      console.log(prevDay);

      const filteredData = data.filter((item: any) => {
        console.log('datee', new Date(item.date) >= prevDay);

        return (
          new Date(item.date) >= prevDay &&
          new Date(item.date) <= dateTo &&
          item.official === !pressed
        );
      });
      setFilteredData(filteredData);
    }
    console.log('fltr', filteredData);
  };
  useEffect(() => {
    filterData();
    //genData();
    // postData();
  }, [pressed]);
  // getData();
  //  updateAPIData();
  //genData2();
  const CustomListCardItem = ({ item }: any) => {
    const id = item.id;
    const date = new Date(item.date);
    const text = item.text;
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
              borderColor: Colors.grey,
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
            <FontAwesome5
              name={'trash'}
              size={27}
              color={Colors.primary1}
              onPress={() => {
                axios.delete(
                  `https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata/${id}`,
                );

                //////
                getData();
                data = APIData;
                //console.log(data);
                if (dateFrom && dateTo) {
                  const prevDay = new Date(dateFrom);
                  prevDay.setDate(prevDay.getDate() - 1);
                  console.log(prevDay);

                  const filteredData = data.filter((item: any) => {
                    console.log('datee', new Date(item.date) >= prevDay);

                    return (
                      new Date(item.date) >= prevDay &&
                      new Date(item.date) <= dateTo &&
                      item.official === !pressed
                    );
                  });
                  setFilteredData(filteredData);
                }
                ///////////
              }}
            />
            <FontAwesome5
              name={'edit'}
              size={20}
              color={Colors.primary1}
              onPress={() => {
                navigation.navigate('Update', { idd: id });
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>{t('Laboratoryresults')}</Text>
        <DateInput
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          setDateFrom={setDateFrom}
        />
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.searchBtn} onPress={filterData}>
            <Text style={styles.searchText}>{t('search')}</Text>
          </TouchableOpacity>
          <View style={styles.border} />
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
                  width: '50%',
                },
                !pressed
                  ? { backgroundColor: Colors.primary2 }
                  : { backgroundColor: Colors.primary1 },
              ]}
              onPress={() => {
                setPressed(true);
              }}>
              <Text
                style={[
                  styles.tabText,
                  !pressed ? {} : { color: Colors.white },
                ]}>
                {t('M')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                { width: '50%', borderRadius: 7 },
                pressed
                  ? { backgroundColor: Colors.primary2 }
                  : { backgroundColor: Colors.primary1 },
              ]}
              onPress={() => {
                setPressed(false);
              }}>
              <Text
                style={[
                  styles.tabText,
                  pressed ? {} : { color: Colors.white },
                ]}>
                {t('NM')}
              </Text>
            </TouchableOpacity>
          </View>
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

/*const data = [
  {
    id: 1,
    date: '2021-05-01',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 2,
    date: '2021-05-01',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 3,
    date: '2021-05-02',
    text: 'result 1',
    description: '1st result',
    official: false,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 4,
    date: '2021-05-03',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 5,
    date: '2021-05-04',
    text: 'result 1',
    description: '1st result',
    official: false,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 6,
    date: '2021-05-05',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 7,
    date: '2021-05-06',
    text: 'result 1',
    description: '1st result',
    official: false,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 8,
    date: '2021-05-07',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 9,
    date: '2021-05-08',
    text: 'result 1',
    description: '1st result',
    official: false,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 10,
    date: new Date('2021-05-09'),
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 11,
    date: '2021-05-10',
    text: 'result 1',
    description: '1st result',
    official: false,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 12,
    date: '2021-05-11',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 13,
    date: '2021-05-12',
    text: 'result 1',
    description: '1st result',
    official: false,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 14,
    date: '2021-05-13',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 15,
    date: '2021-05-14',
    text: 'result 1',
    description: '1st result',
    official: false,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 16,
    date: '2021-05-15',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 17,
    date: '2021-05-16',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 18,
    date: '2021-05-17',
    text: 'result 1',
    description: '1st result',
    official: false,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 19,
    date: '2021-05-18',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
  {
    id: 20,
    date: '2021-05-19',
    text: 'result 1',
    description: '1st result',
    official: true,
    field1: 'data field 1 for element  1 ',
    field2: 'data field 1 for element  1',
  },
];*/
