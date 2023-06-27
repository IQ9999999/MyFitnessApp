/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import weatherReducer from './features/Weather';
import {todayStepReducer, weekStepReducer} from './features/StepCounter';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    todayStep: todayStepReducer,
    weekStep: weekStepReducer,
  },
});

export default store;
