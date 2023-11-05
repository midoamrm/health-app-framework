import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/values/Colors';
const Followingcomp = ({ navigation, route, p1, p2, p3, p4, p5, p6 }) => {
  const [pressed, setPressed] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <View style={{ backgroundColor: '#202326' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderleftWidth: 2,
          borderRadius: 10,
          marginTop: 30,
          marginHorizontal: 20,
          borderColor: Colors.primary1,
        }}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 25,
          fontWeight: 'bold',
          padding: 20,
        }}>
        {p1}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            marginLeft: 34,
            marginBottom: 8,
            marginTop: 7,
          }}
          source={require('../assets/images/xr.png')}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: '#25292b',
            backgroundColor: '#25292b',
            width: 300,
            marginLeft: 15,
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: '#59ada8',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 20,
            }}>
            {p2}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderStyle: 'dotted',
          height: 50,
          borderLeftWidth: 5,
          borderColor: Colors.primary1,
          marginLeft: 55,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            marginLeft: 34,
            marginBottom: 8,
            marginTop: 7,
          }}
          source={require('../assets/images/xr.png')}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: '#25292b',
            backgroundColor: '#25292b',
            width: 300,
            marginLeft: 15,
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: '#59ada8',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 20,
            }}>
            {p3}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderStyle: 'dotted',
          height: 50,
          borderLeftWidth: 5,
          borderColor: Colors.primary1,
          marginLeft: 55,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            marginLeft: 34,
            marginBottom: 8,
            marginTop: 7,
          }}
          source={require('../assets/images/xr.png')}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: '#25292b',
            backgroundColor: '#25292b',
            width: 300,
            marginLeft: 15,
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: '#59ada8',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 20,
            }}>
            {p4}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderStyle: 'dotted',
          height: 50,
          borderLeftWidth: 5,
          borderColor: Colors.primary1,
          marginLeft: 55,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            marginLeft: 34,
            marginBottom: 8,
            marginTop: 7,
          }}
          source={require('../assets/images/dn.png')}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: '#292524',
            backgroundColor: '#292524',
            width: 300,
            marginLeft: 15,
            borderRadius: 15,
            marginBottom: 30,
          }}>
          <Text
            style={{
              color: '#f2994a',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 20,
            }}>
            {p5}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Followingcomp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  text2: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 20,
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  searchBtn: {
    backgroundColor: Colors.secondary1,
    borderRadius: 15,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  infoText: {
    color: Colors.grey,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabText: {
    color: Colors.primary1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
    height: 100,
  },
  border: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1.5,
    width: '90%',
    marginVertical: 10,
  },
});
