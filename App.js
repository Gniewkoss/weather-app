import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, TextInput } from 'react-native';
import Weather from './components/Weather';
import * as Location from 'expo-location';
import { API_KEY } from './utils/WeatherApiKey';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    city: '', 
    cityInput: '',
    forecast: [],
    error: null
  };
  

  async componentDidMount() {
    await this.getLocation();
  }
  getWeatherByCity = async (cityName) => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
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
      this.setState({ error: 'Could not fetch weather for that city', isLoading: false });
    }
  };
  
  getForecastByCity = async (cityName) => {
    const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      const result = await response.json();
      const dailyData = result.list.filter(reading => reading.dt_txt.includes("12:00:00"));
      this.setState({ forecast: dailyData });
    } catch (error) {
      this.setState({ error: 'Could not fetch forecast for that city' });
    }
  };
  
  
  getForecast = async (lat, lon) => {
    const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  
    try {
      const response = await fetch(FORECAST_API);
      const result = await response.json();
  
      const dailyData = result.list.filter(reading => reading.dt_txt.includes("12:00:00"));
  
      this.setState({ forecast: dailyData });
    } catch (error) {
      this.setState({ error: 'Could not fetch forecast data' });
    }
  };

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
      this.getForecast(latitude, longitude);
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
  handleCitySearch = () => {
    const { cityInput } = this.state;
    if (cityInput.trim() === '') return;
    this.setState({ isLoading: true });
    this.getWeatherByCity(cityInput);
    this.getForecastByCity(cityInput);
  };
  

  render() {
    const { isLoading, temperature, weatherCondition, city, forecast, cityInput } = this.state;
  
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter city"
            style={styles.textInput}
            value={cityInput}
            onChangeText={(text) => this.setState({ cityInput: text })}
            onSubmitEditing={this.handleCitySearch}
            placeholderTextColor="#999"
          />
        </View>
  
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Weather
            temperature={temperature}
            condition={weatherCondition}
            city={city}
            forecast={forecast}
          />
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
  },
  textInput: {
    height: 40,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 10,
    color: '#000'
  },  
  inputContainer: {
    marginTop: 40,
    paddingHorizontal: 20
  }
  
});
