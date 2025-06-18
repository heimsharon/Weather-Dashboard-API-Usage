
// Fetch search history from server
const fetchSearchHistory = async () => {
  try {
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
  } catch (error) {
    console.error('Error fetching search history:', error);
  }
};

// Delete a city from the search history
const deleteSelectedCity = async (id: string) => {
  try {
    await fetch(`/api/weather/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting city from search history:', error);
  }
};

// Clear all search history
const clearHistory = async () => {
  try {
    // Get all cities and delete them one by one
    const history = await fetchSearchHistory();
    const deletePromises = history.map((city: any) =>
      deleteSelectedCity(city.id),
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};
export { fetchSearchHistory, deleteSelectedCity, clearHistory,  };