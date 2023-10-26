import moment from 'moment-hijri';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Calendar from '../components/Calendar';

// Two buttons to change the month of the calendar
const TwoButtons = ({ change, setCurrentDate, date }: any) => {
  const increaseMonth = () => {
    setCurrentDate(new Date(date.setMonth(date.getMonth() + 1)));
    console.log(date);
    change();
  };
  const decreaseMonth = () => {
    setCurrentDate(new Date(date.setMonth(date.getMonth() - 1)));
    console.log(date);
    change();
  };
  return (
    <View style={styles.container2}>
      <TouchableOpacity style={styles.button} onPress={decreaseMonth}>
        <Ionicons name="chevron-back-outline" color="black" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={increaseMonth}>
        <Ionicons name="chevron-forward-outline" color="black" size={20} />
      </TouchableOpacity>
    </View>
  );
};
// Two buttons to change the type of the calendar
const TypeButtons = ({ onPress, setType, type, date }: any) => {
  const [flag, setflag] = useState(true);
  const { t, i18n } = useTranslation();
  const hijri = () => {
    setType('hijri');
    onPress();
  };
  const gregorian = () => {
    setType('gregorian');
    onPress();
  };
  // here we will desgin the output apperance
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 10,
          marginLeft: 3,
          width: 293,
          height: 40,
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: '#bfdeff',
        }}>
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            color: 'black',
          }}
          value={date}
          placeholder={t('dt')}
          placeholderTextColor={'black'}
        />
      </View>

      <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#bfdeff',

            padding: 4,
            backgroundColor: !flag ? '#117a8b' : 'white',
          }}>
          <TouchableOpacity
            onPress={() => {
              hijri();
              setflag(false);
            }}>
            <Text
              style={{
                color: !flag ? 'white' : '#aadde5',
                fontWeight: 'bold',
              }}>
              {t('hijri')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#bfdeff',
            backgroundColor: flag ? '#117a8b' : 'white',
            padding: 4,
          }}>
          <TouchableOpacity
            onPress={() => {
              gregorian();
              setflag(true);
            }}>
            <Text
              style={{
                color: flag ? 'white' : '#aadde5',
                fontWeight: 'bold',
              }}>
              {t('georgi')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const Hiridate2 = () => {
  // States
  const { t, i18n } = useTranslation();
  const [date, setdate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState('gregorian');
  const [show, setShow] = useState(false);
  const [calendar, setCalendar] = useState(<></>);
  const getmonth = (s: string) => {
    if (s === '1') {
      return 'Muharram';
    } else if (s == '2') {
      return 'Safar';
    } else if (s == '3') {
      return 'Rabi al-awwal';
    } else if (s == '4') {
      return 'Rabi al-Thani';
    } else if (s == '5') {
      return 'Jumada al-awwal';
    } else if (s == '6') {
      return 'Jumada al-Thani';
    } else if (s == '7') {
      return 'Rajab';
    } else if (s == '8') {
      return 'Shaban';
    } else if (s == '9') {
      return 'Ramadan';
    } else if (s == '10') {
      return 'Shawwal';
    } else if (s == '11') {
      return 'Dhul Qadah';
    } else if (s == '12') {
      return 'Dhul Hijjah';
    }
  };
  // Change the calendar when the type state or date is changed
  const change = () => {
    setCalendar(
      <Calendar
        key={currentDate.toDateString() + type}
        moment={moment}
        type={type}
        monthsCount={1}
        startDate={currentDate}
        onSelectionChange={(date: { to: any }) => {
          if (type === 'hijri') {
            var s = '';
            s = moment(date.to).format('iYYYY/00/iM');
            var n = s.slice(8, 10);
            console.log(getmonth(n));

            setdate(moment(date.to).format('iYYYY/iM/iD'));
          } else {
            //  console.log(moment(date.to).format('YYYY/M/D'));
            setdate(moment(date.to).format('YYYY/M/D'));
          }
          setIsVisible(false);
        }}
      />,
    );
  };

  // Change the calendar when the type state is changed
  useEffect(() => {
    change();
  }, [type]);

  // Open the Modal when the isVisible state is true
  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  // Return the two buttons and the calendar
  return (
    <View style={styles.listViewContainer}>
      {/* Two button centered one to open a hijri modal and one to open a gregorian modal */}
      <TypeButtons
        onPress={() => {
          setIsVisible(true);
        }}
        setType={setType}
        type={type}
        date={date}
      />
      <Modal visible={show} animationType="slide">
        <View style={{ backgroundColor: '#f0ecec', height: '100%' }}>
          <TwoButtons
            change={change}
            setCurrentDate={setCurrentDate}
            date={currentDate}
          />
          {calendar}
          <View style={styles.container3}>
            <View style={{ backgroundColor: '#007bff', width: 60, height: 40 }}>
              <TouchableOpacity onPress={{}}>
                <Text style={styles.buttonText}>{t('clear')}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#6c757d', width: 60, height: 40 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                }}>
                <Text style={styles.buttonText}>{t('close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Hiridate2;

// Styles
const styles = StyleSheet.create({
  container: {
    width: 300,
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
  },
  buttonText2: {
    color: '#aadde5',
    fontWeight: 'bold',
  },

  listViewContainer: {
    //flex:1,

    width: '50%',
    marginLeft: 60,
  },
});
