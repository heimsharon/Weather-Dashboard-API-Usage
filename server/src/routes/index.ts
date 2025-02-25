//This file sets up the main routes for the server, directing API requests to the appropriate API routes and other requests to the HTML routes.

import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

//Use API routes for any requests to /api.
router.use('/api', apiRoutes);

//Use HTML routes for any other requests.
router.use('/', htmlRoutes);

export default router;