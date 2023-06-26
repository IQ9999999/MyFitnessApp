/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import fitnessReducer from './fitnessSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
    fitness: fitnessReducer,
  },
});
