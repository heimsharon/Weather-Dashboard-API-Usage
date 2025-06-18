import { renderCurrentWeather } from '../features/currentWeather';
import { renderForecast } from '../features/forecast';

// Fetch weather data for a given city
const fetchWeather = async (cityName: string) => {
  try {
    const response = await fetch('/api/weather/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityName }),
    });

    const weatherData = await response.json();
    console.log('weatherData: ', weatherData);

    if (weatherData.error) {
      console.error('Error fetching weather data:', weatherData.error);
      return;
    }

    renderCurrentWeather(weatherData[0]);
    renderForecast(weatherData.slice(1));
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export { fetchWeather, renderCurrentWeather};

