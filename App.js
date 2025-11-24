import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </AppProvider>
  );
}
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from './src/screens/SettingsScreen';
import TipsAdviceScreen from './src/screens/TipsAdviceScreen';
import WelcomeDialog from './src/components/WelcomeDialog';

const Stack = createStackNavigator();

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TipsAdvice"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TipsAdvice" component={TipsAdviceScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      {showWelcome && (
        <WelcomeDialog
          userName="Sarah"
          onClose={() => setShowWelcome(false)}
          onCraftMessage={() => {
            setShowWelcome(false);
            // Navigate to craft message screen
          }}
        />
      )}
    </NavigationContainer>
  );
}

export default App;
