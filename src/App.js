import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { colors } from './theme/colors';
import { StorageService } from './services/StorageService';

// Screens
import OnboardingScreen1 from './screens/Onboarding/OnboardingScreen1';
import OnboardingScreen2 from './screens/Onboarding/OnboardingScreen2';
import OnboardingScreen3 from './screens/Onboarding/OnboardingScreen3';
import HomeScreen from './screens/Home/HomeScreen';
import NewChatScreen from './screens/NewChat/NewChatScreen';
import ReplyOptionsScreen from './screens/ReplyOptions/ReplyOptionsScreen';
import FlirtyStartersScreen from './screens/FlirtyStarters/FlirtyStartersScreen';
import ApologyGuideScreen from './screens/ApologyGuide/ApologyGuideScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    const completed = await StorageService.isOnboardingComplete();
    setIsOnboardingComplete(completed);
  };

  // Show nothing while checking onboarding status
  if (isOnboardingComplete === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
        initialRouteName={isOnboardingComplete ? 'Home' : 'Onboarding1'}>
        {/* Onboarding Screens */}
        <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />

        {/* Main App Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewChat" component={NewChatScreen} />
        <Stack.Screen name="ReplyOptions" component={ReplyOptionsScreen} />
        <Stack.Screen name="FlirtyStarters" component={FlirtyStartersScreen} />
        <Stack.Screen name="ApologyGuide" component={ApologyGuideScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
