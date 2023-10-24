import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text } from 'react-native';
const Homme = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Page under implemention</Text>
    </SafeAreaView>
  );
};

export default Homme;
