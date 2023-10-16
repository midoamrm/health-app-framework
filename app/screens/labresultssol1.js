// Example of Infinite Loading Listview in React Native using FlatList
// https://aboutreact.com/infinite-list-view/

// import React in our code
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Colors from '../assets/values/Colors';
// import all the components we are going to use
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Labresultsol1 = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [ittr, setittr] = useState(0);
  useEffect(() => genData(), []);
  const genData = () => {
    setittr(ittr + 10);
    setTimeout(() => {
      setLoading(true);
    }, 2000);

    var datagen = [];
    for (let i = ittr; i < ittr + 10; i++) {
      var obj = {
        id: i,
        date: '2021-05-01',
        text: 'result' + i,
        description: i + 'th result',
        official: true,
        field1: 'data field' + i + 'for element  1 ',
        field2: 'data field' + i + 'for element  1 ',
      };
      datagen.push(obj);
    }
    setDataSource([...dataSource, ...datagen]);
    setLoading(false);
  };
  const getData = () => {
    console.log(offset);
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      // Service to get the data from the server to render
      fetch('https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata')
        // Sending the currect offset with get request
        .then((response) => response.json())
        .then((responseJson) => {
          // Successful response from the API Call
          console.log(responseJson);
          if (responseJson.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };
  const CustomListCardItem = ({ item }) => {
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
      <TouchableOpacity onPress={() => {}}>
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
            {i18n.language === 'ar' && (
              <FontAwesome5
                name={'arrow-left'}
                size={20}
                color={Colors.primary1}
                onPress={() => {}}
              />
            )}
            {i18n.language === 'en' && (
              <FontAwesome5
                name={'arrow-right'}
                size={20}
                color={Colors.primary1}
                onPress={() => {}}
              />
            )}

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

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.date}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={CustomListCardItem}
        ListFooterComponent={renderFooter}
        onEndReached={genData}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary2,
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

export default Labresultsol1;
