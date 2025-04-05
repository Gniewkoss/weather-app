import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import Weather from './components/Weather';
import * as Location from 'expo-location';
import { API_KEY } from './utils/WeatherApiKey';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    city: '', 
    error: null
  };
  

  async componentDidMount() {
    await this.getLocation();
  }
  

  getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.setState({ error: 'Permission to access location was denied' });
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      this.getWeather(latitude, longitude);
    } catch (error) {
      this.setState({ error: 'Error getting location', isLoading: false });
    }
  };
  

  getWeather = async (lat, lon) => {
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      const result = await response.json();

    this.setState({
    temperature: Math.round(result.main.temp),
    weatherCondition: result.weather[0].main,
    city: result.name,
    isLoading: false
});
    } catch (error) {
      this.setState({ error: 'Could not fetch weather data', isLoading: false });
    }
  };

  render() {
    const { isLoading, temperature, weatherCondition } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Weather temperature={temperature} condition={weatherCondition} city={this.state.city} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});
