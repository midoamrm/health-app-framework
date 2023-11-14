import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, PixelRatio, StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/values/Colors';
const Followingcomp = ({
  navigation,
  route,
  p1,
  p2,
  p3,
  p4,
  p5,
  state1,
  state2,
  state3,
  state4,
}) => {
  const [pressed, setPressed] = useState(false);
  const { t, i18n } = useTranslation();
  var ht = 800;
  if (PixelRatio.get() <= 2) {
    ht = 1200;
  }
  return (
    <View style={{ backgroundColor: '#202326', height: ht }}>
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
        {state1 === 'ok' && (
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
        )}
        {state1 === 'not' && (
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
        )}

        <View
          style={{
            borderWidth: 1,
            borderColor: state1 === 'ok' ? '#25292b' : '#292524',
            backgroundColor: state1 === 'ok' ? '#25292b' : '#292524',
            width: 300,
            marginLeft: 15,
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: state1 === 'ok' ? '#59ada8' : '#f2994a',
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
          borderColor: state1 === 'ok' ? Colors.primary1 : 'white',
          marginLeft: 55,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        {state2 === 'ok' && (
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
        )}
        {state2 === 'not' && (
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
        )}

        <View
          style={{
            borderWidth: 1,
            borderColor: state2 === 'ok' ? '#25292b' : '#292524',
            backgroundColor: state2 === 'ok' ? '#25292b' : '#292524',
            width: 300,
            marginLeft: 15,
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: state2 === 'ok' ? '#59ada8' : '#f2994a',
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
          borderColor: state2 === 'ok' ? Colors.primary1 : 'white',
          marginLeft: 55,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        {state3 === 'ok' && (
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
        )}
        {state3 === 'not' && (
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
        )}
        <View
          style={{
            borderWidth: 1,
            borderColor: state3 === 'ok' ? '#25292b' : '#292524',
            backgroundColor: state3 === 'ok' ? '#25292b' : '#292524',
            width: 300,
            marginLeft: 15,
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: state3 === 'ok' ? '#59ada8' : '#f2994a',
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
          borderColor: state3 === 'ok' ? Colors.primary1 : 'white',
          marginLeft: 55,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        {state4 === 'ok' && (
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
        )}
        {state4 === 'not' && (
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
        )}

        <View
          style={{
            borderWidth: 1,
            borderColor: state4 === 'ok' ? '#25292b' : '#292524',
            backgroundColor: state4 === 'ok' ? '#25292b' : '#292524',
            width: 300,
            marginLeft: 15,
            borderRadius: 15,
            marginBottom: 30,
          }}>
          <Text
            style={{
              color: state4 === 'ok' ? '#59ada8' : '#f2994a',
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
