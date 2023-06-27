/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import {OPEN_WEATHER_MAP_API_KEY} from '@env';

const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (_, thunkAPI) => {
    try {
      const {coords} = await getPosition();
      const {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}`,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({message: error.message});
    }
  },
);

// Helper function to get the user's current position
function getPosition() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {weather: null, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default weatherSlice.reducer;
export {fetchWeather};
