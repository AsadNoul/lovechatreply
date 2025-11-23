import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import TipsAdviceScreen from '../screens/TipsAdviceScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TipsAdvice"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFF'},
      }}>
      <Stack.Screen name="TipsAdvice" component={TipsAdviceScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
