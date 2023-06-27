/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import MainScreen from './screens/MainScreen';
import StepHistoryScreen from './screens/StepHistoryScreen';
import GoalSettingScreen from './screens/SetGoalScreen';

const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="StepHistory" component={StepHistoryScreen} />
        <Stack.Screen name="GoalSetting" component={GoalSettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
