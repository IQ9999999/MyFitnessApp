/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {OPEN_WEATHER_MAP_API_KEY} from '@env';

// Async action for fetching weather data
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location: {lat: number; lon: number}) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${OPEN_WEATHER_MAP_API_KEY}`,
    );
    return response.data;
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {data: {}, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched weather data to the state
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;

export default weatherSlice.reducer;
