import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Colors from '../assets/values/Colors';
import { LabResultsScreen } from '../screens';
import LabResultsMasterDetails from '../screens/LabResultsMasterDetails';

const Stack = createStackNavigator();

const LabResultsStack = ({ navigation }: any) => (
  <Stack.Navigator
    initialRouteName="LabResults"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: Colors.primary2 },
    }}>
    <Stack.Screen
      name="LabResults"
      component={LabResultsScreen}
      options={{ headerShown: false }}
      initialParams={{ nav: navigation }}
    />
    <Stack.Screen
      name="LabResultsMasterDetails"
      component={LabResultsMasterDetails}
      options={{ headerShown: false }}
      initialParams={{ nav: navigation }}
    />
  </Stack.Navigator>
);

export default LabResultsStack;
