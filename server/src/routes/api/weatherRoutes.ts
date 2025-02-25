// This file defines API routes for retrieving weather data, managing search history, and deleting cities from the search history

import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

//POST Request with city name to retrieve weather data.
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;
  console.log(`Received request for city: ${cityName}`);
  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    console.log('Weather data retrieved:', weatherData);
    await HistoryService.addCity(cityName);
    res.json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

//GET search history.
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    console.log('Search history retrieved:', cities);
    res.json(cities);
  } catch (error) {
    console.error('Error retrieving search history:', error);
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

//DELETE city from search history.
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HistoryService.removeCity(id);
    console.log(`City with id ${id} removed from search history`);
    res.json({ message: 'City removed from search history' });
  } catch (error) {
    console.error('Error removing city from search history:', error);
    res
      .status(500)
      .json({ error: 'Failed to remove city from search history' });
  }
});

export default router;
