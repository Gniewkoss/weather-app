import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native';
import { Image } from 'react-native';


const Weather = ({ temperature, condition ,city, forecast }) => {
    const weatherOptions = {
        Thunderstorm: {
          iconName: "weather-lightning",
          gradient: ["#373B44", "#4286f4"],
          title: "Thunderstorm"
        },
        Drizzle: {
          iconName: "weather-hail",
          gradient: ["#89F7FE", "#66A6FF"],
          title: "Light Rain"
        },
        Rain: {
          iconName: "weather-rainy",
          gradient: ["#00C6FB", "#005BEA"],
          title: "Raining"
        },
        Snow: {
          iconName: "weather-snowy",
          gradient: ["#7DE2FC", "#B9B6E5"],
          title: "Snowing"
        },
        Clear: {
          iconName: "weather-sunny",
          gradient: ["#fceabb", "#f8b500"],
          title: "Sunny"
        },
        Clouds: {
          iconName: "weather-cloudy",
          gradient: ["#D7D2CC", "#304352"],
          title: "Cloudy"
        },
        Mist: {
          iconName: "weather-fog",
          gradient: ["#4DA0B0", "#D39D38"],
          title: "Misty"
        },
        Smoke: {
          iconName: "weather-fog",
          gradient: ["#56CCF2", "#2F80ED"],
          title: "Smoky"
        },
        Haze: {
          iconName: "weather-hazy",
          gradient: ["#3E5151", "#DECBA4"],
          title: "Hazy"
        },
        Dust: {
          iconName: "weather-windy",
          gradient: ["#B79891", "#94716B"],
          title: "Dusty"
        },
        Fog: {
          iconName: "weather-fog",
          gradient: ["#3E5151", "#DECBA4"],
          title: "Foggy"
        },
        Sand: {
          iconName: "weather-windy-variant",
          gradient: ["#C2B280", "#EDE574"],
          title: "Sandy"
        }
      };
      
  const weather = weatherOptions[condition] || weatherOptions["Clear"];

  return (
    
    <LinearGradient
      colors={weather.gradient}
      style={styles.weatherContainer}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons size={48} name={weather.iconName} color={'#fff'} />
        <Text style={styles.tempText}>{temperature}°C</Text>
        <Text style={styles.cityText}>{city}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.forecastContainer}>
  <Text style={styles.forecastTitle}>5-Day Forecast</Text>
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={forecast}
    keyExtractor={item => item.dt.toString()}
    renderItem={({ item }) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp = Math.round(item.main.temp);
      const icon = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      return (
        <View style={styles.forecastItem}>
          <Text style={styles.dayText}>{day}</Text>
          <Image source={{ uri: iconUrl }} style={styles.icon} />
          <Text style={styles.tempText}>{temp}°C</Text>
        </View>
      );
    }}
  />
</View>
<View style={styles.forecastContainer}>
  <Text style={styles.forecastTitle}>5-Day Forecast</Text>
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={forecast}
    keyExtractor={item => item.dt.toString()}
    renderItem={({ item }) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp = Math.round(item.main.temp);
      const icon = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      return (
        <View style={styles.forecastItem}>
          <Text style={styles.dayText}>{day}</Text>
          <Image source={{ uri: iconUrl }} style={styles.icon} />
          <Text style={styles.tempText}>{temp}°C</Text>
        </View>
      );
    }}
  />
</View>
<View style={styles.forecastContainer}>
  <Text style={styles.forecastTitle}>5-Day Forecast</Text>
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={forecast}
    keyExtractor={item => item.dt.toString()}
    renderItem={({ item }) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp = Math.round(item.main.temp);
      const icon = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      return (
        <View style={styles.forecastItem}>
          <Text style={styles.dayText}>{day}</Text>
          <Image source={{ uri: iconUrl }} style={styles.icon} />
          <Text style={styles.forecastTempText}>{temp}°C</Text>
        </View>
      );
    }}
  />
</View>
        <Text style={styles.title}>{weather.title}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    width: '100%',
  },
  cityText: {
    fontSize: 24,
    color: '#fff',
    marginTop: 10
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
  },
  forecastContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  forecastTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10
  },
  forecastItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  dayText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5
  },
  forecastTempText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
  
});

export default Weather;
