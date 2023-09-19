import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../assets/values/Colors';

export default DateInput = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const { t, i18n } = useTranslation();
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
            placeholder={t('date')}
            onTouchStart={() => setOpenFrom(true)}
          />
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
          title={t('date2')}
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
          title={t('date2')}
        />
      )}
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
