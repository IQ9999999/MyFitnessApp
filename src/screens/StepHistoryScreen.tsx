// src/screens/StepHistoryScreen.tsx
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchWeekSteps} from '../features/StepCounter';

const StepHistoryScreen = () => {
  const dispatch = useDispatch();

  const weekSteps = useSelector((state: any) => state.weekStep.weekStep);
  const dailySteps = useSelector((state: any) => state.weekStep.dailySteps);
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
    stepsContent = (
      <View>
        {dailySteps.map(step => (
          <Text key={step.date}>
            Date: {step.date}, Steps: {step.value}
          </Text>
        ))}
        <Text>This Week's Total Steps: {weekSteps}</Text>
      </View>
    );
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
