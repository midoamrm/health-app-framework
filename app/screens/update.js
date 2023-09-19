import axios from 'axios';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
const Update = ({ navigation, route }) => {
  var id = route.params.idd;
  const [date, setdate] = useState('');
  const [description, setdescription] = useState('');
  const [text, settext] = useState('');
  const [field1, setfield1] = useState('');
  const [field2, setfield2] = useState('');
  const Date = (text) => {
    setdate(text);
  };
  const Description = (text) => {
    setdescription(text);
  };
  const Text = (text) => {
    settext(text);
  };
  const Field1 = (text) => {
    setfield1(text);
  };
  const Field2 = (text) => {
    setfield2(text);
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginTop: 100,
        marginLeft: 40,
        marginRight: 40,
        padding: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 10,
      }}>
      <TextInput
        placeholder={'date Ex: 2021-05-01 '}
        placeholderTextColor="black"
        onChangeText={(text) => Date(text)}
        value={date}
        textAlign="left"
        maxLength={30}
      />
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <TextInput
        placeholder={'result'}
        placeholderTextColor="black"
        onChangeText={(text) => Text(text)}
        value={text}
        textAlign="left"
        maxLength={30}
      />
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <TextInput
        placeholder={'Description'}
        placeholderTextColor="black"
        onChangeText={(text) => Description(text)}
        value={description}
        textAlign="left"
        maxLength={30}
      />
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <TextInput
        placeholder={'Field1'}
        placeholderTextColor="black"
        onChangeText={(text) => Field1(text)}
        value={field1}
        textAlign="left"
        maxLength={30}
      />
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <TextInput
        placeholder={'Field2'}
        placeholderTextColor="black"
        onChangeText={(text) => Field2(text)}
        value={field2}
        textAlign="left"
        maxLength={30}
      />
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View
        style={{
          width: '100%',
          borderRadius: 40,
        }}>
        <Button
          title="update"
          onPress={() => {
            axios.put(
              `https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata/${id}`,
              {
                date: date,
                text: text,
                description: description,
                official: true,
                field1: 'data field' + 3 + 'for element  1 ',
                field2: 'data field' + 3 + 'for element  1 ',
              },
            );
          }}
        />
      </View>
    </View>
  );
};

export default Update;
