import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PixelRatio,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../assets/values/Colors';
var isDarkTheme = '';
var isDarkTheme2 = '';
export default DateInput = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {
  const [openFrom, setOpenFrom] = useState(false);
  const { t, i18n } = useTranslation();
  const [openTo, setOpenTo] = useState(false);

  const theme = useColorScheme();
  var up = 15;
  if (PixelRatio.get() <= 2) {
    up = 25;
  }
  if (theme !== 'light') {
    isDarkTheme = '#FFFFFF';
    isDarkTheme2 = '#000000';
    console.log('black', isDarkTheme2);
  }
  if (theme === 'light') {
    isDarkTheme = Colors.grey;
    isDarkTheme2 = 'black';
    console.log('gf', isDarkTheme2);
  }
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.inputContainer}>
          {i18n.language === 'ar' && (
            <TextInput
              style={{
                flex: 1,
                fontSize: up,
                color: '#8DA9B6',
              }}
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
              placeholder={t('Datefrom')}
              placeholderTextColor={'#8DA9B6'}
              onTouchStart={() => setOpenFrom(true)}
            />
          )}
          {i18n.language === 'en' && (
            <TextInput
              style={{
                flex: 1,
                fontSize: up,
                color: '#8DA9B6',
              }}
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
              placeholder={t('Datefrom')}
              placeholderTextColor={'#8DA9B6'}
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
        <View style={styles.inputContainer}>
          {i18n.language === 'en' && (
            <TextInput
              style={{
                flex: 1,
                fontSize: up,
                fontWeight: 'bold',
                color: '#8DA9B6',
              }}
              value={
                dateTo == null
                  ? ''
                  : dateTo.toLocaleDateString('en-EG-u-nu-latn', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
              }
              placeholder={t('Dateto')}
              placeholderTextColor={'#8DA9B6'}
              onTouchStart={() => setOpenTo(true)}
            />
          )}
          {i18n.language === 'ar' && (
            <TextInput
              style={{
                flex: 1,
                fontSize: up,
                color: '#8DA9B6',
              }}
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
              placeholder={t('Dateto')}
              placeholderTextColor={'#8DA9B6'}
              onTouchStart={() => setOpenTo(true)}
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
          title={t('chooseDatefrom')}
        />
      )}
      {i18n.language === 'ar' && (
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
          title={t('chooseDateto')}
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
          title={t('chooseDatefrom')}
        />
      )}
      {i18n.language === 'en' && (
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
          locale="en"
          style={styles.datePicker}
          title={t('chooseDateto')}
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
    borderWidth: 1,
    backgroundColor: isDarkTheme2,
    borderColor: Colors.secondary1,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
  },
  dateInput: {
    flex: 1,
    fontSize: 15,
    color: isDarkTheme2,
  },
  icon: {
    marginRight: 10,
  },
});
