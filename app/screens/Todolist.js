import React from 'react';
import { Text, View } from 'react-native';
const Todolist = ({ navigation, route }) => {
  //var id = route.params.idd;

  return (
    <View
      style={{
        marginTop: 100,
        marginLeft: 40,
        marginRight: 40,
        padding: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 10,
      }}>
      <Text style={{ fontSize: 30 }}>To Do List content </Text>
    </View>
  );
};

export default Todolist;
