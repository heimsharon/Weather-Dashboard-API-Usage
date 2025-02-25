// This file defines API routes for retrieving weather data, managing search history, and deleting  cities from the search history

import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

// Interface for Coordinates Object
interface Coordinates {
  lat: number;
  lon: number;
}
// Defined class of Weather Object
class Weather {
  constructor(
    public tempF: number,
    public humidity: number,
    public windSpeed: number,
    public icon: string,
    public date?: string,
    public city?: string,
    public iconDescription?: string,
  ) {}
}

// Service for fetching and processing weather data
class WeatherService {
  private baseURL: string = process.env.API_BASE_URL || ''; // Base URL for the weather API
  private apiKey: string = process.env.API_KEY || ''; // API key for the weather API
  private cityName: string = ''; // City name for the weather data

  // Fetch location data for a given query (city name)
  private async fetchLocationData(query: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch location data: ${response.statusText}`,
        );
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching location data for city ${query}:`, error);
      throw new Error('Failed to fetch location data');
    }
  }
  // Convert location data into coordinates (latitude and longitude)
  private destructureLocationData(locationData: any): Coordinates {
    try {
      return {
        lat: locationData[0].lat,
        lon: locationData[0].lon,
      };
    } catch (error) {
      console.error('Error destructuring location data:', error);
      throw new Error('Failed to destructure location data');
    }
  }

  // Build the weather query URL using coordinates
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  // Fetching weather data using coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }
  // Parse the current weather data from the API response
  private parseCurrentWeather(response: any): Weather {
    try {
      const currentWeather = response.list[0];
      return new Weather(
        currentWeather.main.temp,
        currentWeather.main.humidity,
        currentWeather.wind.speed,
        currentWeather.weather[0].icon,
        currentWeather.dt_txt,
        this.cityName,
        currentWeather.weather[0].description,
      );
    } catch (error) {
      console.error('Error parsing current weather data:', error);
      throw new Error('Failed to parse current weather data');
    }
  }

  // Build an array of Weather objects for the 5-day forecast
  private buildForecastArray(weatherData: any[]): Weather[] {
    try {
      const dailyForecast = weatherData.filter(
        (_, index: number) => index % 8 === 0,
      );
      return dailyForecast.map((data: any) => {
        return new Weather(
          data.main.temp,
          data.main.humidity,
          data.wind.speed,
          data.weather[0].icon,
          data.dt_txt,
          this.cityName,
          data.weather[0].description,
        );
      });
    } catch (error) {
      console.error('Error building forecast array:', error);
      throw new Error('Failed to build forecast array');
    }
  }
  // Get weather data for a specific city (combining all methods into a single server request)
  async getWeatherForCity(city: string): Promise<Weather[]> {
    try {
      this.cityName = city;
      const locationData = await this.fetchLocationData(city);
      const coordinates = this.destructureLocationData(locationData);
      const weatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecast = this.buildForecastArray(weatherData.list);
      return [currentWeather, ...forecast];
    } catch (error) {
      console.error(`Error getting weather for city ${city}:`, error);
      throw new Error('Failed to get weather for city');
    }
  }
}

//Export an instance of WeatherService.
export default new WeatherService();
