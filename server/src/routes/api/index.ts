//This file sets up the API routes for the weather-related endpoints.

import { Router } from 'express';
const router = Router();

import weatherRoutes from './weatherRoutes.js';

//Use weather routes for any requests to /weather.
router.use('/weather', weatherRoutes);

export default router;
