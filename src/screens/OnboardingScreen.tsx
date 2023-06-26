/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Button} from 'react-native';

const OnboardingScreen = ({navigation}) => {
  return (
    <View>
      <Text>Welcome!</Text>
      <Button title="Start" onPress={() => navigation.navigate('Main')} />
    </View>
  );
};

export default OnboardingScreen;
