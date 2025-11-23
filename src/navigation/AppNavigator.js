import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ScenarioDetailScreen from '../screens/ScenarioDetailScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="ScenarioDetail"
          component={ScenarioDetailScreen}
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
