import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNTextDetector from 'rn-text-detector';
const Ocr = ({ navigation }: any) => {
  const [state, setState] = useState<{
    loading: boolean;
    image: string | null;
    toast: {
      message: string;
      isVisible: boolean;
    };
    textRecognition: [] | null;
  }>({
    loading: false,
    image: null,
    textRecognition: null,
    toast: {
      message: '',
      isVisible: false,
    },
  });

  function onPress(type: 'capture' | 'library') {
    setState({ ...state, loading: true });
    type === 'capture'
      ? launchCamera({ mediaType: 'image' }, onImageSelect)
      : launchImageLibrary({ mediaType: 'image' }, onImageSelect);
  }
  async function onImageSelect(media: { assets: [{ uri: string }] }) {
    if (!media) {
      setState({ ...state, loading: false });
      return;
    }
    if (!!media && media.assets) {
      const file = media.assets[0].uri;
      const textRecognition = await RNTextDetector.detectFromUri(file);
      const INFLIGHT_IT = 'Inflight IT';
      //if match toast will appear
      const matchText = textRecognition.findIndex((item: { text: string }) =>
        item.text.match(INFLIGHT_IT),
      );
      setState({
        ...state,
        textRecognition,
        image: file,
        toast: {
          message: matchText > -1 ? 'Ohhh i love this company!!' : '',
          isVisible: matchText > -1,
        },
        loading: false,
      });

      console.log('image reader', state.image);
    }
  }
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            width: 300,
            padding: 10,
            paddingLeft: 80,
            marginLeft: 50,
            marginBottom: 10,
          }}>
          <Text style={{ color: '#8DA9B6', fontSize: 20, fontStyle: 'italic' }}>
            Read prescription
          </Text>
        </View>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              width: 300,
              padding: 10,
              paddingLeft: 80,
              marginLeft: 50,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 30,
            }}>
            <TouchableOpacity onPress={() => onPress('library')}>
              <Text
                style={{ color: 'black', fontSize: 20, fontStyle: 'italic' }}>
                Pick a prescription
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: 370,
              height: 400,
              padding: 10,
              paddingLeft: 80,
              marginLeft: 20,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 30,
            }}>
            {!!state.textRecognition &&
              state.textRecognition.map((item: { text: string }, i: number) => (
                <Text style={{ color: 'black', fontSize: 25 }} key={i}>
                  {item.text}
                </Text>
              ))}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: 100,
              padding: 10,
              paddingLeft: 30,
              marginLeft: 140,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Resreve');
              }}>
              <Text
                style={{ color: 'black', fontSize: 20, fontStyle: 'italic' }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Ocr;
