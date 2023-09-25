import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
const Todolist = ({ navigation, route }) => {
  //var id = route.params.idd;
  const theme = useColorScheme();
  return (
    <View
      style={
        theme === 'light'
          ? { backgroundColor: 'red' }
          : { backgroundColor: 'black' }
      }>
      <Text style={{ fontSize: 30 }}>To Do List content </Text>
    </View>
  );
};

export default Todolist;
