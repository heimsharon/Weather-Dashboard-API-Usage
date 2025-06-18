import {  fetchSearchHistory} from '../api/apiHistory';
import { deleteSelectedCity, clearHistory } from '../api/apiHistory';
import { fetchWeather } from '../api/apiWeather';

// Render search history
const renderSearchHistory = async (searchHistory: any) => {
  if (searchHistoryContainer) {
    searchHistoryContainer.innerHTML = '';

    if (!searchHistory || !searchHistory.length) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No Previous Search History';
      emptyMessage.classList.add('history-empty-message');
      searchHistoryContainer.appendChild(emptyMessage);
      return;
    }

    // Start at end of history array and count down to show the most recent cities at the top
    for (let i = searchHistory.length - 1; i >= 0; i--) {
      const historyItem = buildHistoryListItem(searchHistory[i]);
      searchHistoryContainer.append(historyItem);
    }
  }
};
// Delete button for each city listed in the search history
const createDeleteSelectedCityButton = (city: any) => {
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-selected-city-btn');
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.dataset.cityId = city.id;

  return deleteBtn;
};
const createHistoryButton = (city: string) => {
  const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-controls', 'today forecast');
  btn.classList.add('history-btn');
  btn.textContent = city;

  return btn;
};

// Build a history list item
const buildHistoryListItem = (city: any) => {
  const listItem = document.createElement('li');
  listItem.classList.add('history-item');

  //Create city button
  const historyBtn = createHistoryButton(city.name);
  historyBtn.setAttribute('aria-label', 'Search for this city');

  // Create delete button
  const deleteBtn = createDeleteSelectedCityButton(city);
  deleteBtn.setAttribute('aria-label', 'Delete this city');
  deleteBtn.dataset.cityId = city.id;

  const trashIcon = document.createElement('i');
  trashIcon.classList.add('fas', 'fa-trash-alt');
  deleteBtn.appendChild(trashIcon);

  deleteBtn.addEventListener('click', (event) => {
    const cityId = deleteBtn.dataset.cityId;
    if (!cityId) {
      console.error('City ID not found for deletion');
      return;
    }
    event.stopPropagation(); // Prevent the click from bubbling up to the history button
    // Call the delete function with the city ID
    console.log('Deleting city with ID:', cityId);
    handleDeleteSelectedCityClick(event);
  });

  listItem.append(historyBtn);
  listItem.append(deleteBtn);

  return listItem;
};
const handleSearchHistoryClick = (event: any) => {
  if (event.target.matches('.history-btn')) {
    const city = event.target.textContent;
    fetchWeather(city).then(getAndRenderHistory);
  }
};

// Handle delete searched city button click
const handleDeleteSelectedCityClick = async (event: any) => {
  event.stopPropagation();

  const cityId = event.currentTarget.dataset.cityId;
  if (cityId) {
    await deleteSelectedCity(cityId);
    await getAndRenderHistory();
  }
};

// Handle clear search history button click
const handleClearHistoryClick = (event: any) => {
  event.preventDefault();
  clearHistory().then(getAndRenderHistory);
  searchHistoryContainer.innerHTML =
    '<p class="text-center">No Previous Search History</p>';
};
const getAndRenderHistory = () =>
  fetchSearchHistory().then(renderSearchHistory);
searchHistoryContainer?.addEventListener('click', handleSearchHistoryClick);
clearHistoryBtn?.addEventListener('click', handleClearHistoryClick);
deleteSelectedCityBtn?.addEventListener('click', handleDeleteSelectedCityClick);

getAndRenderHistory();

export { renderSearchHistory, getAndRenderHistory, buildHistoryListItem, createHistoryButton, createDeleteSelectedCityButton };