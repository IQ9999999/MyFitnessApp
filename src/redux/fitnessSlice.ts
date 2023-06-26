/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import GoogleFit from 'react-native-google-fit';
import moment from 'moment';

export const fetchTodaySteps = createAsyncThunk(
  'fitness/fetchTodaySteps',
  async () => {
    const options = {
      startDate: moment().startOf('day').toDate().getTime(),
      endDate: moment().endOf('day').toDate().getTime(),
    };
    const res = await GoogleFit.getDailyStepCountSamples(options);
    return res[0].steps;
  },
);

export const fetchWeekSteps = createAsyncThunk(
  'fitness/fetchWeekSteps',
  async () => {
    const options = {
      startDate: moment().startOf('week').toDate().getTime(),
      endDate: moment().endOf('week').toDate().getTime(),
    };
    const res = await GoogleFit.getDailyStepCountSamples(options);
    return res;
  },
);

const fitnessSlice = createSlice({
  name: 'fitness',
  initialState: {
    todaySteps: 0,
    weekSteps: [],
    dailyGoal: 10000,
    status: 'idle',
    error: null,
  },
  reducers: {
    setDailyGoal: (state, action) => {
      state.dailyGoal = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodaySteps.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTodaySteps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todaySteps = action.payload;
      })
      .addCase(fetchTodaySteps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchWeekSteps.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWeekSteps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weekSteps = action.payload;
      })
      .addCase(fetchWeekSteps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setDailyGoal} = fitnessSlice.actions;
export default fitnessSlice.reducer;
