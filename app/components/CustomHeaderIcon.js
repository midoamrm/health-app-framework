import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Colors from '../assets/values/Colors';

const CustomHeaderIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 15 }}>
      <Image
        source={require('../assets/images/menu_icon.png')}
        style={{ width: 30, height: 30, transform: [{ scaleX: -1 }] }}
        tintColor={Colors.primary2}
      />
    </TouchableOpacity>
  );
};
export default CustomHeaderIcon;
