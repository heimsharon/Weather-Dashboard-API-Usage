// This file handles fetching weather data, rendering current and forecast weather, and managing search history

import './styles/index.css';
import './public/styles/footer.css';

import {
  searchForm,
  searchInput,
  historyList,
  clearAllSearchHistoryBtn,
} from './utils/DOMelements';

import { fetchWeather } from './api/apiWeather';


import { renderSearchHistory } from './components/searchHistory';
import { fetchSearchHistory, deleteSelectedCity, clearHistory } from './api/apiHistory';

//* Event Handlers ========================================================================

// Handle search form submit
const handleSearchFormSubmit = async (event: Event) => {
  event.preventDefault();
  if (!searchInput.value.trim()) return;
  await fetchWeather(searchInput.value.trim());
  await getAndRenderHistory();
  searchInput.value = '';
};

// Handle search history click
const handleSearchHistoryClick = async (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('history-btn')) {
    await fetchWeather(target.textContent || '');
    await getAndRenderHistory();
  }
  if (target.classList.contains('delete-city-btn')) {
    const cityId = target.closest('button')?.dataset.cityId;
    if cityId) {
      await deleteSelectedCity(cityId);
      await getAndRenderHistory();
    }
  }
};

// Handle clear history button click
const handleClearHistoryClick = async (event: Event) => {
  event.preventDefault();
  await clearHistory();
  await getAndRenderHistory();
};

//* Initialization ========================================================================

const getAndRenderHistory = async () => {
  const history = await fetchSearchHistory();
  renderSearchHistory(history);
};

// Set up event listeners
searchForm?.addEventListener('submit', handleSearchFormSubmit);
historyList?.addEventListener('click', handleSearchHistoryClick);
clearAllSearchHistoryBtn?.addEventListener('click', handleClearHistoryClick);

// Initial render
getAndRenderHistory();

