import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../assets/values/Colors';
var isDarkTheme = '';
var isDarkTheme2 = '';
export default DateInput = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const { t, i18n } = useTranslation();
  const theme = useColorScheme();
  if (theme !== 'light') {
    isDarkTheme = Colors.white;
    isDarkTheme2 = 'black';
    console.log('gf', isDarkTheme);
  }
  if (theme === 'light') {
    isDarkTheme = Colors.grey;
    isDarkTheme2 = Colors.white;
    console.log('gf', isDarkTheme);
  }
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.inputContainer}>
          {i18n.language === 'ar' && (
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
              placeholder={'تاريخ الحادث'}
              onTouchStart={() => setOpenFrom(true)}
            />
          )}
          {i18n.language === 'en' && (
            <TextInput
              style={styles.dateInput}
              value={
                dateFrom == null
                  ? ''
                  : dateFrom.toLocaleDateString('en-EG-u-nu-latn', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
              }
              placeholder={'تاريخ الحادث'}
              onTouchStart={() => setOpenFrom(true)}
            />
          )}

          <FontAwesome5
            name="calendar-alt"
            size={20}
            color={Colors.grey}
            style={styles.icon}
          />
        </View>
      </View>

      {i18n.language === 'ar' && (
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
          title={'ناريخ الحادث'}
        />
      )}
      {i18n.language === 'en' && (
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
          locale="en"
          style={styles.datePicker}
          title={'Date of accident'}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: Colors.white,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    paddingLeft: 0,
  },
  dateInput: {
    flex: 1,
    fontSize: 10,
    color: Colors.black,
  },
  icon: {
    marginRight: 10,
  },
});
