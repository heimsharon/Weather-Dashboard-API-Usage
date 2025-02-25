import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
import routes from './routes/index.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3001;

//Static files of entire client dist folder.
app.use(express.static(path.join(__dirname, '../../client/dist')));

//Middleware for parsing JSON and urlencoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware to connect the routes.
app.use(routes);

//Start the server on the specified port.
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));