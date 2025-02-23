import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  constructor(
    public tempF: number,
    public humidity: number,
    public windSpeed: number,
    public icon: string,
    public date?: string,
    public city?: string,
    public iconDescription?: string
  ) {}
}

class WeatherService {
  private baseURL: string = process.env.API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string = '';

  private async fetchLocationData(query: string): Promise<any> {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
    return response.json();
  }

  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData[0].lat,
      lon: locationData[0].lon,
    };
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return response.json();
  }

  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.list[0];
    return new Weather(
      currentWeather.main.temp,
      currentWeather.main.humidity,
      currentWeather.wind.speed,
      currentWeather.weather[0].icon,
      currentWeather.dt_txt,
      this.cityName,
      currentWeather.weather[0].description
    );
  }

  private buildForecastArray(weatherData: any[]): Weather[] {
    // Filter the forecast data to get one entry per day
    const dailyForecast = weatherData.filter((_, index: number) => index % 8 === 0);
    return dailyForecast.map((data: any) => {
      return new Weather(
        data.main.temp,
        data.main.humidity,
        data.wind.speed,
        data.weather[0].icon,
        data.dt_txt,
        this.cityName,
        data.weather[0].description
      );
    });
  }

  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(weatherData.list);
    return [currentWeather, ...forecast];
  }
}

export default new WeatherService();