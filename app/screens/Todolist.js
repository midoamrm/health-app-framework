import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';
const Resreve = ({ navigation, route }) => {
  //var id = route.params.idd;
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
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 50,
          marginLeft: 40,
          marginRight: 40,
          padding: 20,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
        }}>
        <View
          style={{
            marginRight: 100,
            width: 200,
            borderRadius: 40,
          }}>
          <Button title="معلومات عامه" color={'black'} />
        </View>

        <TextInput
          placeholder={'اختر نوع المطالبه'}
          placeholderTextColor="black"
          onChangeText={(text) => Date(text)}
          value={date}
          textAlign="right"
          maxLength={30}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <TextInput
          placeholder={'تاريخ الحادث'}
          placeholderTextColor="black"
          onChangeText={(text) => Text(text)}
          value={text}
          textAlign="right"
          maxLength={30}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <TextInput
          placeholder={'المبلغ المطلوب'}
          placeholderTextColor="black"
          onChangeText={(text) => Description(text)}
          value={description}
          textAlign="right"
          maxLength={30}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <TextInput
          placeholder={'الشرح'}
          placeholderTextColor="black"
          onChangeText={(text) => Field1(text)}
          value={field1}
          textAlign="right"
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
            borderRadius: 40,
          }}>
          <Button
            title="التالي"
            color={'#1D5B8C'}
            onPress={() => {
              navigation.navigate('Resreve2');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Resreve;
