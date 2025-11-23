import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ScenarioDetailScreen from '../screens/ScenarioDetailScreen';
import CustomScenarioScreen from '../screens/CustomScenarioScreen';
import MessageResultsScreen from '../screens/MessageResultsScreen';
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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
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
        <Stack.Screen
          name="CustomScenario"
          component={CustomScenarioScreen}
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerTitle: 'Create Custom Message',
          }}
        />
        <Stack.Screen
          name="MessageResults"
          component={MessageResultsScreen}
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerTitle: 'Your Messages',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
