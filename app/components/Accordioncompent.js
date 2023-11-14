import React, { Component } from 'react';
import {
  FlatList,
  LayoutAnimation,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
var isDarkTheme = '';
var up = 14;
export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    if (PixelRatio.get() <= 2) {
      up = 35;
    }
  }

  render() {
    // console.log(this.props.data);
    return (
      <View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.toggleExpand()}>
          <Text
            style={[
              {
                fontSize: up,

                color: '#000000',
              },
            ]}>
            {this.props.title}
          </Text>
          <Icon
            name={
              this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
            }
            size={30}
            color={'#000000'}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={{}}>
            <FlatList
              data={this.state.data}
              numColumns={1}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    style={[
                      styles.childRow,
                      styles.button,
                      item.value ? styles.btnActive : styles.btnInActive,
                    ]}
                    onPress={() => this.onClick(index)}>
                    <Text style={[styles.font, styles.itemInActive]}>
                      {item.key}
                    </Text>
                    <Icon
                      name={'check-circle'}
                      size={24}
                      color={item.value ? '#008000' : '#D3D3D3'}
                    />
                  </TouchableOpacity>
                  <View style={styles.childHr} />
                </View>
              )}
            />
          </View>
        )}
      </View>
    );
  }

  onClick = (index) => {
    const temp = this.state.data.slice();
    temp[index].value = !temp[index].value;
    this.setState({ data: temp });
  };

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 14,

    color: '#000000',
  },
  itemActive: {
    fontSize: 12,
    color: '#008000',
  },
  itemInActive: {
    fontSize: 12,
    color: 'black',
  },
  btnActive: {
    borderColor: '#008000',
  },
  btnInActive: {
    borderColor: '#A9A9A9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E5E4E2',
  },
  parentHr: {
    height: 1,
    color: '#FFFFFF',
    width: '100%',
  },
  childHr: {
    height: 1,
    backgroundColor: '#D3D3D3',
    width: '100%',
  },
  colorActive: {
    borderColor: '#008000',
  },
  colorInActive: {
    borderColor: '#A9A9A9',
  },
});
