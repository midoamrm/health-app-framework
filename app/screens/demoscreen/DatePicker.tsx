import { View } from 'react-native';
import Hiridate from '../../components/Hiridate';
import Hiridate2 from '../../components/Hiridate2';

const DatePicker = () => {
  return (
    <View>
      <Hiridate2 />
      <View
        style={{
          paddingBottom: 34,
        }}>
        <Hiridate />
      </View>
    </View>
  );
};
export default DatePicker;
