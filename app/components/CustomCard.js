import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/values/Colors';
export default CustomCard = ({ title, icons, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardIcon}>{icons}</View>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    margin: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    width: '30%',
    height: 110,
  },
  cardIcon: {
    // padding: 10,
    // borderRadius: 10,
    // margin: 10,
  },
  cardTitle: {
    color: Colors.grey,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
