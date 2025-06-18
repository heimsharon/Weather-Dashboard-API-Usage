import {
  cityName,
  currentDate,
  weatherIcon,
  weather,
  temp,
  feelsLike,
  description,
  highTemp,
  lowTemp,
  uvIndex,
  humidity,
  clouds,
  visibility,
  windSpeed,
  windGust,
  windDirection,
  pressure,
  dewPoint,
  sunrise,
  sunset,
  unitLabel,
} from '../utils/DOMelements';
import { CurrentWeather, DailyWeather } from '../utils/types';

// Utility functions
const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const formatTime = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

export function renderCurrentWeather(
  city: string,
  current: CurrentWeather,
  today: DailyWeather,
  units: 'imperial' | 'metric' = 'imperial',
) {
  if (!cityName || !currentDate) return;

  // Set city and date
  cityName.textContent = city;
  currentDate.textContent = formatDate(current.dt);

  // Set weather icon and description
  if (weatherIcon && current.weather && current.weather[0]) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    weatherIcon.alt = current.weather[0].description;
  }
  if (weather && current.weather && current.weather[0]) {
    weather.textContent = `Weather: ${current.weather[0].main}`;
    description.textContent = `Description: ${current.weather[0].description}`;
  }

  // Set temperatures
  const tempUnit = units === 'metric' ? '°C' : '°F';
  temp.textContent = `Temperature: ${Math.round(current.temp)}${tempUnit}`;
  feelsLike.textContent = `Feels Like: ${Math.round(current.feels_like)}${tempUnit}`;
  highTemp.textContent = `High: ${Math.round(today.temp.max)}${tempUnit}`;
  lowTemp.textContent = `Low: ${Math.round(today.temp.min)}${tempUnit}`;

  // Set other weather details
  uvIndex.textContent = `UV Index: ${current.uvi}`;
  humidity.textContent = `Humidity: ${current.humidity}%`;
  clouds.textContent = `Clouds: ${current.clouds}%`;
  visibility.textContent = `Visibility: ${current.visibility} m`;
  windSpeed.textContent = `Wind Speed: ${current.wind_speed} ${units === 'metric' ? 'm/s' : 'MPH'}`;
  windGust.textContent = `Wind Gust: ${current.wind_gust ?? 0} ${units === 'metric' ? 'm/s' : 'MPH'}`;
  windDirection.textContent = `Wind Direction: ${current.wind_deg}°`;
  pressure.textContent = `Pressure: ${current.pressure} hPa`;
  dewPoint.textContent = `Dew Point: ${Math.round(current.dew_point)}${tempUnit}`;
  sunrise.textContent = `Sunrise: ${formatTime(current.sunrise)}`;
  sunset.textContent = `Sunset: ${formatTime(current.sunset)}`;

  // Update unit label if present
  if (unitLabel) {
    unitLabel.textContent = units === 'metric' ? '°C / °F' : '°F / °C';
  }
}
