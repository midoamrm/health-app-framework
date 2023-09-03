import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../assets/values/Colors';

export default DateInput = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.dateInput}
            value={
              dateFrom == null
                ? ''
                : dateFrom.toLocaleDateString('ar-EG-u-nu-latn', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
            }
            placeholder="التاريخ من"
            onTouchStart={() => setOpenFrom(true)}
          />
          <FontAwesome5
            name="calendar-alt"
            size={20}
            color={Colors.grey}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.dateInput}
            value={
              dateTo == null
                ? ''
                : dateTo.toLocaleDateString('ar-EG-u-nu-latn', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
            }
            placeholder="التاريخ الي"
            onTouchStart={() => setOpenTo(true)}
          />
          <FontAwesome5
            name="calendar-alt"
            size={20}
            color={Colors.grey}
            style={styles.icon}
          />
        </View>
      </View>

      <DatePicker
        modal
        open={openFrom}
        date={dateFrom ?? new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpenFrom(false);
          setDateFrom(date);
          console.log(dateFrom);
        }}
        onCancel={() => {
          setOpenFrom(false);
        }}
        locale="ar"
        style={styles.datePicker}
        title={'اختر التاريخ من'}
      />
      <DatePicker
        modal
        open={openTo}
        date={dateTo ?? new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpenTo(false);
          setDateTo(date);
          console.log(dateTo);
        }}
        onCancel={() => {
          setOpenTo(false);
        }}
        locale="ar"
        style={styles.datePicker}
        title={'اختر التاريخ الي'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: Colors.black,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.secondary1,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
  },
  dateInput: {
    flex: 1,
    fontSize: 10,
    color: Colors.grey,
  },
  icon: {
    marginRight: 10,
  },
});
