import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Colors from '../assets/values/Colors';
import Accordian from '../components/Accordioncompent';
export default function Llist({ navigation, route }: any) {
  const CustomListCardItem = ({ item }: any) => {
    const data = item.data;
    const titel = item.titel;
    return (
      <View style={{ paddingBottom: 10 }}>
        <Accordian title={titel} data={data} />
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.listContainer}>
            <FlatList
              data={data}
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

const data = [
  {
    data: [],
    titel: 'موظفات استقبال وطب الاسره',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'شكر وتقدير',
  },
  {
    data: [],
    titel: 'شكر وتقدير',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
  {
    data: [],
    titel: 'قسم جرحه المخ والاعصاب',
  },
];
