// This file handles fetching weather data, rendering current and forecast weather, and managing search history

import './styles/jass.css';

// Select all necessary DOM elements
const searchForm: HTMLFormElement = document.getElementById('search-form') as HTMLFormElement;
const searchInput: HTMLInputElement = document.getElementById('search-input') as HTMLInputElement;
const todayContainer = document.querySelector('#today') as HTMLDivElement;
const forecastContainer = document.querySelector('#forecast') as HTMLDivElement;
const searchHistoryContainer = document.getElementById('history') as HTMLDivElement;
const heading: HTMLHeadingElement = document.getElementById('search-title') as HTMLHeadingElement;
const weatherIcon: HTMLImageElement = document.getElementById('weather-img') as HTMLImageElement;
const tempEl: HTMLParagraphElement = document.getElementById('temp') as HTMLParagraphElement;
const windEl: HTMLParagraphElement = document.getElementById('wind') as HTMLParagraphElement;
const humidityEl: HTMLParagraphElement = document.getElementById('humidity') as HTMLParagraphElement;

/*

API Calls

*/

// Fetch weather data for a given city
const fetchWeather = async (cityName: string) => {
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
};

// Fetch search history from server
const fetchSearchHistory = async () => {
  const response = await fetch('/api/weather/history', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const history = await response.json();

  // Log the search history
  console.log('Search history:', history);
  return history;
};

// Delete a city from the search history
const deleteCityFromHistory = async (id: string) => {
  await fetch(`/api/weather/history/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/*

Render Functions

*/

// Render current weather data
const renderCurrentWeather = (currentWeather: any): void => {
  const { city, date, icon, iconDescription, tempF, windSpeed, humidity } = currentWeather;

  // Extract only the date part (YYYY-MM-DD) from the date string and format it to (MM-DD_YYY)
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  heading.textContent = `${city} (${formattedDate})`;
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.setAttribute('class', 'weather-img');
  heading.append(weatherIcon);
  tempEl.textContent = `Temp: ${tempF}°F`;
  windEl.textContent = `Wind: ${windSpeed} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  if (todayContainer) {
    todayContainer.innerHTML = '';
    todayContainer.append(heading, tempEl, windEl, humidityEl);
  }
};

// Render 5-day weather forecast
const renderForecast = (forecast: any): void => {
  // Log the forecast data
  console.log('Forecast data:', forecast);

  const headingCol = document.createElement('div');
  const heading = document.createElement('h4');

  headingCol.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingCol.append(heading);

  if (forecastContainer) {
    forecastContainer.innerHTML = '';
    forecastContainer.append(headingCol);
  }

  // Assuming forecast is an array of daily forecasts
  for (let i = 0; i < forecast.length; i++) {
    renderForecastCard(forecast[i]);
  }
};
// Rendering each forecast card
const renderForecastCard = (forecast: any) => {
  const { date, icon, iconDescription, tempF, windSpeed, humidity } = forecast;

  const { col, card, cardBody, cardTitle, weatherIcon, tempEl, windEl, humidityEl } = createForecastCard();

  // Extract only the date part (YYYY-MM-DD) from the date string and format it
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  // Add content to elements
  cardTitle.textContent = formattedDate;
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.classList.add('weather-img');
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windSpeed} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  // Append elements to card body
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.append(card);

  if (forecastContainer) {
    forecastContainer.append(col);
  }
};

// Render search history
const renderSearchHistory = async (searchHistory: any) => {
  if (searchHistoryContainer) {
    searchHistoryContainer.innerHTML = '';

    if (!searchHistory.length) {
      searchHistoryContainer.innerHTML = '<p class="text-center">No Previous Search History</p>';
      return;
    }

    // Start at end of history array and count down to show the most recent cities at the top
    for (let i = searchHistory.length - 1; i >= 0; i--) {
      const historyItem = buildHistoryListItem(searchHistory[i]);
      searchHistoryContainer.append(historyItem);
    }
  }
};

/*

Helper Functions

*/

// Create a forecast card
const createForecastCard = () => {
  const col = document.createElement('div');
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const weatherIcon = document.createElement('img');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.classList.add('col-auto');
  card.classList.add('forecast-card', 'card', 'text-white', 'bg-primary', 'h-100');
  cardBody.classList.add('card-body', 'p-2');
  cardTitle.classList.add('card-title');
  tempEl.classList.add('card-text');
  windEl.classList.add('card-text');
  humidityEl.classList.add('card-text');

  return {
    col,
    card,
    cardBody,
    cardTitle,
    weatherIcon,
    tempEl,
    windEl,
    humidityEl,
  };
};

// Create history buttons for each city searched (search history)
const createHistoryButton = (city: string) => {
  const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-controls', 'today forecast');
  btn.classList.add('history-btn', 'btn', 'btn-secondary', 'col-10');
  btn.textContent = city;

  return btn;
};

// Delate button for each city listed in the search history
const createDeleteButton = () => {
  const delBtnEl = document.createElement('button');
  delBtnEl.setAttribute('type', 'button');
  delBtnEl.classList.add('fas', 'fa-trash-alt', 'delete-city', 'btn', 'btn-danger', 'col-2');

  delBtnEl.addEventListener('click', handleDeleteHistoryClick);
  return delBtnEl;
};

// Create div for search history
const createHistoryDiv = () => {
  const div = document.createElement('div');
  div.classList.add('display-flex', 'gap-2', 'col-12', 'm-1');
  return div;
};

// Build a history list item
const buildHistoryListItem = (city: any) => {
  const newBtn = createHistoryButton(city.name);
  const deleteBtn = createDeleteButton();
  deleteBtn.dataset.city = JSON.stringify(city);
  const historyDiv = createHistoryDiv();
  historyDiv.append(newBtn, deleteBtn);
  return historyDiv;
};

/*

Event Handlers

*/

// Handle search button click
const handleSearchFormSubmit = (event: any): void => {
  event.preventDefault();

  if (!searchInput.value) {
    throw new Error('City cannot be blank');
  }

  const search: string = searchInput.value.trim();
  fetchWeather(search).then(() => {
    getAndRenderHistory();
  });
  searchInput.value = '';
};

// Handle searched city history button click
const handleSearchHistoryClick = (event: any) => {
  if (event.target.matches('.history-btn')) {
    const city = event.target.textContent;
    fetchWeather(city).then(getAndRenderHistory);
  }
};

// Handle delete searched city button click
const handleDeleteHistoryClick = (event: any) => {
  event.stopPropagation();
  const cityID = JSON.parse(event.target.getAttribute('data-city')).id;
  deleteCityFromHistory(cityID).then(getAndRenderHistory);
};

/*

Initial Render

*/

// Fetch and render search history
const getAndRenderHistory = () => fetchSearchHistory().then(renderSearchHistory);

//Add event listeners
searchForm?.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer?.addEventListener('click', handleSearchHistoryClick);

// Initial render of search history
getAndRenderHistory();