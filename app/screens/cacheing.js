import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

const Cache = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const cacheData = async () => {
    if (key === '' || value === '') {
      Alert.alert(
        'Either key or value field is empty. Please enter values for both.',
      );
      return;
    }
    try {
      await AsyncStorage.setItem(key, value);
      Alert.alert(
        'Item with key: ' +
          key +
          ' and value: ' +
          value +
          ' successfully cached.',
      );
    } catch (error) {
      Alert.alert(
        'Some error occured while caching data. Check console logs for details.',
      );
      console.log(error);
    }
  };

  const fetchData = async () => {
    if (key === '') {
      Alert.alert(
        'Key field is empty. Please enter they key to fetch corresponding data.',
      );
      return;
    }
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        Alert.alert('Data corresponding to the key ' + key + ' is: ' + value);
      } else {
        Alert.alert(
          'Data corresponding to the key ' + key + ' does not exist in cache.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Some error occured while fetching data. Check console logs for details.',
      );
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter key"
        placeholderTextColor="black"
        keyboardType="default"
        onChangeText={(text) => setKey(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        placeholderTextColor="black"
        keyboardType="default"
        onChangeText={(text) => setValue(text)}
      />
      <View style={styles.separator} />
      <Button title="Cache Data" color="black" onPress={() => cacheData()} />
      <View style={styles.separator} />
      <Button title="Fetch Data" color="black" onPress={() => fetchData()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    width: 200,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
    paddingLeft: 15,
    fontSize: 20,
    margin: 10,
  },
  separator: {
    paddingTop: 20,
  },
});

export default Cache;
