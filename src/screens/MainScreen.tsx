/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchWeather} from '../features/Weather';
import {fetchTodaySteps} from '../features/StepCounter';

const MainScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const weather = useSelector((state: any) => state.weather.weather);
  const weatherStatus = useSelector((state: any) => state.weather.status);

  // Steps logic
  const steps = useSelector((state: any) => state.todayStep.todayStep);
  const stepsStatus = useSelector((state: any) => state.todayStep.status);
  const stepsGoal = useSelector((state: any) => state.todayStep.goal);

  useEffect(() => {
    if (weatherStatus === 'idle') {
      dispatch(fetchWeather());
    }

    if (stepsStatus === 'idle') {
      dispatch(fetchTodaySteps());
    }
  }, [weatherStatus, stepsStatus, dispatch]);

  let weatherContent;

  if (weatherStatus === 'loading') {
    weatherContent = <ActivityIndicator size="large" color="#0000ff" />;
  } else if (weatherStatus === 'succeeded') {
    const temperatureCelsius = weather.main.temp - 273.15;
    weatherContent = (
      <Text>
        {weather.name}: {temperatureCelsius.toFixed(2)}°C
      </Text>
    );
  } else if (weatherStatus === 'failed') {
    weatherContent = <Text>Failed to load weather.</Text>;
  }

  let stepsContent;
  let stepsGoalContent;

  if (stepsStatus === 'loading') {
    stepsContent = <ActivityIndicator size="large" color="#0000ff" />;
  } else if (stepsStatus === 'succeeded') {
    stepsContent = <Text>Today's Steps: {steps}</Text>;
    stepsGoalContent = <Text>Step Goal: {stepsGoal}</Text>;
  } else if (stepsStatus === 'failed') {
    stepsContent = <Text>Failed to load steps.</Text>;
  }

  let achievedGoalContent;
  if (steps >= stepsGoal) {
    achievedGoalContent = <Text>Goal Achieved!</Text>;
  } else {
    achievedGoalContent = <Text>Goal Not Achieved</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather:</Text>
      {weatherContent}
      <Text style={styles.title}>Step Counter:</Text>
      {stepsContent}
      {stepsGoalContent}
      {achievedGoalContent}

      <Button
        title="See History"
        onPress={() => navigation.navigate('StepHistory')}
      />
      <Button
        title="Set Goal"
        onPress={() => navigation.navigate('GoalSetting')}
      />
    </View>
  );
};

export default MainScreen;

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
