import axios from 'axios';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
const Update = ({ navigation, route }) => {
  var id = route.params.idd;
  const [date, setdate] = useState('');
  const [description, setdescription] = useState('');
  const Date = (text) => {
    setdate(text);
  };
  const Description = (text) => {
    setdescription(text);
  };
  return (
    <View>
      <TextInput
        placeholder={'date'}
        placeholderTextColor="black"
        onChangeText={(text) => Date(text)}
        value={date}
        textAlign="left"
        maxLength={30}
      />
      <TextInput
        placeholder={'description'}
        placeholderTextColor="black"
        onChangeText={(text) => Description(text)}
        value={description}
        textAlign="left"
        maxLength={30}
      />
      <Button
        title="update"
        onPress={() => {
          axios.put(
            `https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata/${id}`,
            {
              date: date,
              text: 'result' + 3,
              description: description,
              official: true,
              field1: 'data field' + 3 + 'for element  1 ',
              field2: 'data field' + 3 + 'for element  1 ',
            },
          );
        }}
      />
    </View>
  );
};

export default Update;
