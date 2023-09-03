import axios from 'axios';
import React, { useState } from 'react';
import { Button, View } from 'react-native';

const Cruddb = () => {
  const [APIData, setAPIData] = useState([]);
  var firstName = 'mohamed';
  var lastName = 'Amr';
  var checkbox = true;
  const postData = () => {
    axios.post('https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata', {
      firstName,
      lastName,
      checkbox,
    });
    console.log('fggg');
  };
  const getData = () => {
    axios
      .get('https://64ec81d3f9b2b70f2bfa7413.mockapi.io/fakedata')
      .then((response) => {
        setAPIData(response.data);
      });
    console.log(APIData);
  };
  /* useEffect(() => {
    axios
      .get('https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData')
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);*/
  return (
    <View>
      <Button
        title=" Post"
        onPress={() => {
          postData();
        }}
      />
      <Button
        title="  Get"
        onPress={() => {
          getData();
        }}
      />
    </View>
  );
};

export default Cruddb;
