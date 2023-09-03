import { useTranslation } from 'react-i18next';
import { Button, I18nManager, StyleSheet, View } from 'react-native';
import RNRestart from 'react-native-restart';
const Language = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.sectionWrapper} />

        <View style={styles.sectionWrapper}>
          <Button
            title="العربيه"
            onPress={() => {
              i18n.changeLanguage('ar').then(() => {
                I18nManager.forceRTL(i18n.language === 'ar');
                RNRestart.Restart();
              });
            }}
          />
          <Button
            title="English"
            onPress={() => {
              i18n.changeLanguage('en').then(() => {
                I18nManager.forceRTL(i18n.language === 'ar');
                RNRestart.Restart();
              });
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Language;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  sectionWrapper: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'left',
  },
  regularText: {
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
