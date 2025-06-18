import { forecastCards } from '../utils/DOMelements';

// Example forecast data interface (adjust as needed)
interface DailyForecast {
  dt: number;
  temp: { min: number; max: number };
  weather: { icon: string; description: string }[];
  humidity: number;
  wind_speed: number;
  uvi: number;
  rain?: number;
}

// Utility to format date
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// Render a single forecast card
function renderForecastCard(day: DailyForecast) {
  const card = document.createElement('div');
  card.className = 'forecast-card';

  card.innerHTML = `
    <div class="forecast-date">${formatDate(day.dt)}</div>
    <img class="forecast-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" />
    <div class="forecast-description">${day.weather[0].description}</div>
    <div class="forecast-temp">
      <span class="forecast-temp-high">High: ${Math.round(day.temp.max)}°</span>
      <span class="forecast-temp-low">Low: ${Math.round(day.temp.min)}°</span>
    </div>
    <div class="forecast-humidity">Humidity: ${day.humidity}%</div>
    <div class="forecast-wind">Wind: ${day.wind_speed} mph</div>
    <div class="forecast-uvi">UV Index: ${day.uvi}</div>
    <div class="forecast-rain">Rain: ${day.rain ?? 0} mm</div>
  `;
  return card;
}

// Render the 5-day forecast
export function renderForecast(forecast: DailyForecast[]) {
  if (!forecastCards) return;
  forecastCards.innerHTML = '';
  // Skip today (index 0), show next 5 days
  forecast.slice(1, 6).forEach((day) => {
    forecastCards.appendChild(renderForecastCard(day));
  });
}
