import React, { Component, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  const { t, i18n } = useTranslation();
  const [date, setdate] = useState('');
  const [description, setdescription] = useState('');
  const [textt, settext] = useState('');
  const [field1, setfield1] = useState('');
  const [tt, settt] = useState('');
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
            <Text style={[styles.title]}>
              {tt === '' ? this.props.title : tt}
            </Text>
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
      settt(temp[index].key);
      this.setState({ data: temp });
      this.toggleExpand();
    };

    toggleExpand = () => {
      //settt('');
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

  var data = [];
  if (i18n.language === 'ar') {
    data = [
      { key: 'عمل جراحي', value: false },
      { key: 'ولاده طبيعيه ', value: false },
      { key: 'ولاده قيصيريه', value: false },
      { key: 'زياره طبيب', value: false },
      { key: ' طبيب اسنان', value: false },
      { key: ' علاج طبيعي', value: false },
    ];
  }
  if (i18n.language === 'en') {
    data = [
      { key: 'Surgical procedure', value: false },
      { key: 'normal birth', value: false },
      { key: 'Caesarean births', value: false },
      { key: 'Visit a doctor', value: false },
      { key: 'dentist', value: false },
      { key: 'physical therapy', value: false },
    ];
  }

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
        }}>
        <View
          style={{
            marginRight: 100,
            width: 200,
            borderRadius: 40,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontStyle: 'italic',
              color: 'black',
              fontWeight: 600,
            }}>
            {t('g1')}
          </Text>
        </View>
        <Accordian title={t('g5')} data={data} />
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
            width: 240,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder={t('pay')}
            placeholderTextColor="black"
            onChangeText={(text) => Description(text)}
            value={description}
            style={{ color: 'black' }}
            maxLength={30}
          />
          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
              fontWeight: 500,
              color: 'black',
            }}>
            {t('po')}
          </Text>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <TextInput
          placeholder={t('exp')}
          placeholderTextColor="black"
          onChangeText={(text) => Field1(text)}
          value={field1}
          maxLength={30}
          style={{ color: 'black' }}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{ color: 'white' }}>ffffffffffffffffff</Text>
          {i18n.language === 'ar' && (
            <View
              style={{
                borderRadius: 100,
                backgroundColor: '#007bff',
                width: 100,
                marginTop: 15,
                paddingRight: 20,
                alignContent: 'center',
              }}>
              <TouchableOpacity
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
                }}>
                <Text
                  style={{
                    color: 'white',
                    paddingRight: 27,
                    paddingTop: 5,
                    paddingBottom: 5,
                    fontSize: 20,
                  }}>
                  التالي
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {i18n.language === 'en' && (
            <View
              style={{
                borderRadius: 100,
                backgroundColor: '#007bff',
                width: 140,
                marginTop: 15,
                paddingRight: 20,
                alignContent: 'center',
              }}>
              <TouchableOpacity
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
                }}>
                {i18n.language === 'en' && (
                  <Text
                    style={{
                      color: 'white',
                      paddingRight: 27,
                      paddingTop: 5,
                      paddingBottom: 5,
                      fontSize: 20,
                    }}>
                    <Text style={{ color: '#007bff' }}>fffffff</Text>
                    Next
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={{
            borderRadius: 40,
          }}
        />
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
