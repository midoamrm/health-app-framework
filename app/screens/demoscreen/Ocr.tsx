import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNTextDetector from 'rn-text-detector';
const Ocr = () => {
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
    }
  }
  return (
    <SafeAreaView>
      <View>
        <Text style={{ color: 'white' }}>RN OCR SAMPLE</Text>
        <View>
          <TouchableOpacity onPress={() => onPress('capture')}>
            <Text style={{ color: 'white' }}>Take Photo</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={() => onPress('library')}>
              <Text style={{ color: 'white' }}>Pick a Photo</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{ alignItems: 'center' }}>
              <Image source={{ uri: state.image }} />
            </View>
            {!!state.textRecognition &&
              state.textRecognition.map((item: { text: string }, i: number) => (
                <Text style={{ color: 'white' }} key={i}>
                  {item.text}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Ocr;
