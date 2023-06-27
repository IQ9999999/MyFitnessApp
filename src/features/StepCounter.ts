/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import GoogleFit, {Scopes, StartAndEndDate} from 'react-native-google-fit';
import moment from 'moment';

GoogleFit.authorize({
  scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_ACTIVITY_WRITE],
}).then(authResult => {
  if (authResult.success) {
    console.log('AUTH_SUCCESS');
  } else {
    console.log('AUTH_DENIED', authResult.message);
  }
});

const fetchTodaySteps = createAsyncThunk(
  'todayStep/fetchTodaySteps',
  async () => {
    const options: StartAndEndDate = {
      startDate: `${moment().startOf('day').toDate()}`,
      endDate: `${moment().endOf('day').toDate()}`,
    };
    const response = await GoogleFit.getDailyStepCountSamples(options).catch(
      err => console.log('err', err),
    );
    const todaySteps = response.reduce((accumulator, current) => {
      if (current.steps.length > 0) {
        let sourceSteps = current.steps.reduce((total, step) => {
          return total + step.value;
        }, 0);
        return accumulator + sourceSteps;
      }
      return accumulator;
    }, 0);
    return todaySteps;
  },
);

const fetchWeekSteps = createAsyncThunk('weekStep/fetchWeekSteps', async () => {
  const options: StartAndEndDate = {
    startDate: `${moment().startOf('week').toDate()}`,
    endDate: `${moment().endOf('week').toDate()}`,
  };
  const response = await GoogleFit.getDailyStepCountSamples(options).catch(
    err => console.log('err', err),
  );

  let weekSteps = 0;
  let dailySteps = [];

  for (let i = 0; i < response.length; i++) {
    if (response[i].steps.length > 0) {
      let sourceSteps = response[i].steps.reduce((total, step) => {
        console.log('step', step);
        dailySteps.push({date: step.date, value: step.value});
        return total + step.value;
      }, 0);
      weekSteps += sourceSteps;
    }
  }

  // const weekSteps = response.reduce((accumulator, current) => {
  //   if (current.steps.length > 0) {
  //     let sourceSteps = current.steps.reduce((total, step) => {
  //       return total + step.value;
  //     }, 0);
  //     return accumulator + sourceSteps;
  //   }
  //   return accumulator;
  // }, 0);

  console.log('dailySteps', dailySteps);

  return {total: weekSteps, dailySteps};
});

const todayStepSlice = createSlice({
  name: 'todayStep',
  initialState: {todayStep: 0, goal: 10000, status: 'idle', error: null},
  reducers: {
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodaySteps.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTodaySteps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todayStep = action.payload;
      })
      .addCase(fetchTodaySteps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const weekStepSlice = createSlice({
  name: 'weekStep',
  initialState: {weekStep: 0, dailySteps: [], status: 'idle', error: null},
  extraReducers: builder => {
    builder
      .addCase(fetchWeekSteps.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWeekSteps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weekStep = action.payload.total;
        state.dailySteps = action.payload.dailySteps;
      })
      .addCase(fetchWeekSteps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  reducers: undefined,
});

export const {
  reducer: todayStepReducer,
  actions: {setGoal},
} = todayStepSlice;
export const {reducer: weekStepReducer} = weekStepSlice;
export {fetchTodaySteps, fetchWeekSteps};
