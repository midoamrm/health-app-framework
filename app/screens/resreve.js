import React, { useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
const Resreve2 = ({ navigation, route }) => {
  //var id = route.params.idd;
  const [date, setdate] = useState('');
  const [description, setdescription] = useState('');
  const [text, settext] = useState('');
  const [field1, setfield1] = useState('');
  const [field2, setfield2] = useState('');
  const [filesToUpload, setFilesToUpload] = useState([]);
  const Date = (text) => {
    setdate(text);
  };
  const Description = (text) => {
    setdescription(text);
  };
  function readFiles() {
    console.log('Reading file');
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      allowMultiSelection: true,
    }).then((res) => {
      // log file content
      console.log(res);
      // add file to filesToUpload
      setFilesToUpload([...filesToUpload, ...res]);
    });
  }
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 50,
          marginLeft: 40,
          marginRight: 40,
          padding: 20,
          borderBottomRightRadius: 40,
          borderTopLeftRadius: 40,
        }}>
        <Text style={{ fontSize: 30 }}>معلومات عامه</Text>
        <Text style={{ fontSize: 20, paddingTop: 10, padding: 7 }}>
          {' '}
          اجراء التشخيص وعلاجها
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 20, textAlign: 'left', padding: 7 }}>
          26/6/2024
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 20, textAlign: 'left', padding: 7 }}>90</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 20, padding: 7 }}>الشرح</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 50,
          marginLeft: 40,
          marginRight: 40,
          padding: 20,
          borderBottomRightRadius: 40,
          borderTopLeftRadius: 40,
        }}>
        <Text style={{ fontSize: 30 }}>المرفقات</Text>

        <View
          style={{
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 10,
              paddingLeft: 165,
              paddingRight: 10,
            }}>
            البطاقه
          </Text>
          <TouchableOpacity onPress={() => readFiles()}>
            <Image
              width={30}
              height={40}
              source={require('../assets/images/ukk.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 10,
              paddingLeft: 110,
              paddingRight: 10,
            }}>
            مرفقات اضافيه
          </Text>
          <TouchableOpacity onPress={() => readFiles()}>
            <Image
              width={30}
              height={40}
              source={require('../assets/images/ukk.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            width: 150,
            marginLeft: 40,
            borderRadius: 40,
            marginTop: 10,
          }}>
          <Button
            title="الرجوع للتعديل المعلومات"
            color={'#1D5B8C'}
            onPress={() => {
              navigation.navigate('Resreve');
            }}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            width: 130,
            marginLeft: 40,
            borderRadius: 40,
          }}>
          <Button title="مراجعه" color={'#1D5B8C'} onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Resreve2;
