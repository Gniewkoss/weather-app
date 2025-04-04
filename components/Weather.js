import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Weather = ({temperature, condition}) => {
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} />
        <Text style={styles.tempText}>{temperature}°C</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{condition}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733',
    width: '100%',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  }
});

export default Weather;
