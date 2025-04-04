import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Weather from './components/Weather';
import { API_KEY } from './utils/WeatherApiKey';


export default class App extends React.Component {
  state = {
    isLoading: false,  
    temperature: 0, 
    WeatherCondition: null,
    error :null

  };

  

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather</Text>
        ) : (
          <Weather />

        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});