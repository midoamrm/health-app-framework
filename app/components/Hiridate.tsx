import moment from 'moment-hijri';
import { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
      <TouchableOpacity style={styles.button} onPress={increaseMonth}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={decreaseMonth}>
        <Text style={styles.buttonText}>Prev</Text>
      </TouchableOpacity>
    </View>
  );
};
// Two buttons to change the type of the calendar
const TypeButtons = ({ onPress, setType, type, date }: any) => {
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
          marginTop: 10,
          marginLeft: 3,
          width: 220,
          height: 40,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 15,
        }}>
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            color: 'black',
          }}
          value={date}
          placeholder={'Date'}
          placeholderTextColor={'black'}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={hijri}>
          <FontAwesome5
            name="calendar-alt"
            size={20}
            style={{ marginLeft: 20 }}
          />
          <Text style={styles.buttonText}>Hijri</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gregorian}>
          <FontAwesome5
            name="calendar-alt"
            size={20}
            style={{ paddingLeft: 20 }}
          />
          <Text style={styles.buttonText}>Gregi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Hiridate = () => {
  // States

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

            setdate(
              getmonth(n) +
                ' ,' +
                moment(date.to).format('iD,iYYYY') +
                '    Hijri',
            );
          } else {
            //  console.log(moment(date.to).format('YYYY/M/D'));
            setdate(
              'June' +
                ' ,' +
                moment(date.to).format('D,YYYY') +
                '    Gregorian',
            );
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
        <TwoButtons
          change={change}
          setCurrentDate={setCurrentDate}
          date={currentDate}
        />
        {calendar}
      </Modal>
    </View>
  );
};

export default Hiridate;

// Styles
const styles = StyleSheet.create({
  container: {
    width: 240,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
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
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 5,
  },

  listViewContainer: {
    //flex:1,
    width: '50%',

    alignSelf: 'center',
  },
});
