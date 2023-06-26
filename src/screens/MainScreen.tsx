/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchWeather} from '../redux/weatherSlice';

const MainScreen = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector(state => state.weather.data);
  const weatherStatus = useSelector(state => state.weather.status);
  const weatherError = useSelector(state => state.weather.error);

  // We use a static location for simplicity.
  // In a real app, you'd want to get the user's actual location.
  const location = {lat: 37.7749, lon: 122.4194}; // San Francisco

  useEffect(() => {
    dispatch(fetchWeather(location));
  }, [dispatch]);

  if (weatherStatus === 'loading') {
    return <Text>Loading...</Text>;
  } else if (weatherStatus === 'failed') {
    return <Text>Error: {weatherError}</Text>;
  }

  return (
    <View>
      <Text>Temperature: {weatherData.main.temp}°K</Text>
      <Text>Weather: {weatherData.weather[0].description}</Text>
    </View>
  );
};

export default MainScreen;
