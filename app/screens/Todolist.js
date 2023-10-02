import React, { Component, useState } from 'react';
import {
  Button,
  FlatList,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateInput from '../components/DateInput3';
const Resreve = ({ navigation, route }) => {
  //var id = route.params.idd;
  const [date, setdate] = useState('');
  const [description, setdescription] = useState('');
  const [textt, settext] = useState('');
  const [field1, setfield1] = useState('');
  const [field2, setfield2] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [dataa, setDataa] = useState([]);
  var dd = [];
  class Accordian extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: props.data,
        expanded: false,
      };

      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    render() {
      return (
        <View>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.toggleExpand()}>
            <Text style={[styles.title]}>{this.props.title}</Text>
            <Icon
              name={
                this.state.expanded
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={30}
              color={'#000000'}
            />
          </TouchableOpacity>
          <View style={styles.parentHr} />
          {this.state.expanded && (
            <View style={{}}>
              <FlatList
                data={this.state.data}
                numColumns={1}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.childRow,
                        styles.button,
                        item.value ? styles.btnActive : styles.btnInActive,
                      ]}
                      onPress={() => this.onClick(index)}>
                      <Text style={[styles.font, styles.itemInActive]}>
                        {item.key}
                      </Text>
                      <Icon
                        name={'check-circle'}
                        size={24}
                        color={item.value ? '#008000' : '#D3D3D3'}
                      />
                    </TouchableOpacity>
                    <View style={styles.childHr} />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      );
    }

    onClick = (index) => {
      const temp = this.state.data.slice();
      temp[index].value = !temp[index].value;
      this.setState({ data: temp });
    };

    toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ expanded: !this.state.expanded });
      if (this.state.expanded) {
        setDataa(this.state.data);
      }
    };
  }

  const Description = (text) => {
    setdescription(text);
  };

  const Field1 = (text) => {
    setfield1(text);
  };

  var data = [
    { key: 'عمل جراحي', value: false },
    { key: 'ولاده طبيعيه ', value: false },
    { key: 'ولاده قيصيريه', value: false },
    { key: 'زياره طبيب', value: false },
    { key: ' طبيب اسنان', value: false },
    { key: ' علاج طبيعي', value: false },
  ];
  console.log(dataa);
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
        <Accordian title={'اختر نوع المطالبه'} data={data} />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <DateInput
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          setDateFrom={setDateFrom}
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
              var datae = [];
              var d = [];
              datae.push(dateFrom);
              datae.push(description); // price
              datae.push(field1); // explaintion
              d = dataa.filter((x) => x.value === true);
              datae.push(d);
              //console.log('send data', datae);
              navigation.navigate('Resreve2', { datae });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemActive: {
    fontSize: 12,
    color: '#008000',
  },
  itemInActive: {
    fontSize: 12,
    color: 'black',
  },
  btnActive: {
    borderColor: '#008000',
  },
  btnInActive: {
    borderColor: '#A9A9A9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E5E4E2',
  },
  parentHr: {
    height: 1,
    color: '#FFFFFF',
    width: '100%',
  },
  childHr: {
    height: 1,
    backgroundColor: '#D3D3D3',
    width: '100%',
  },
  colorActive: {
    borderColor: '#008000',
  },
  colorInActive: {
    borderColor: '#A9A9A9',
  },
});
export default Resreve;
