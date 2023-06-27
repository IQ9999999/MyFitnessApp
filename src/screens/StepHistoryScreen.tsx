// src/screens/StepHistoryScreen.tsx
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchWeekSteps} from '../features/StepCounter';

const StepHistoryScreen = () => {
  const dispatch = useDispatch();

  // Steps logic
  const steps = useSelector((state: any) => state.weekStep.weekStep);
  const stepsStatus = useSelector((state: any) => state.weekStep.status);

  useEffect(() => {
    if (stepsStatus === 'idle') {
      dispatch(fetchWeekSteps());
    }
  }, [stepsStatus, dispatch]);

  let stepsContent;

  if (stepsStatus === 'loading') {
    stepsContent = <ActivityIndicator size="large" color="#0000ff" />;
  } else if (stepsStatus === 'succeeded') {
    stepsContent = <Text>This Week's Steps: {steps}</Text>;
  } else if (stepsStatus === 'failed') {
    stepsContent = <Text>Failed to load steps.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step History:</Text>
      {stepsContent}
    </View>
  );
};

export default StepHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
