import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import GoogleFit from 'react-native-google-fit';
import {Provider} from 'react-redux';
import store from './src/store';
import MainApp from './src/MainApp';

const App = () => {
  useEffect(() => {
    requestLocationPermission();
    getGoogleFitPermission();
  }, []);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'location permission',
          message: 'Needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn('location permission error', err);
    }
  }

  async function getGoogleFitPermission() {
    GoogleFit.authorize();
  }

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
