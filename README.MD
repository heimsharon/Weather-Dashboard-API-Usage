# Weather Dashboard - API Usage
  
## Description

The Weather Dashboard is a web application that provides real-time weather data and a 5-day forecast for cities worldwide. Users can search for a city to view details such as temperature, wind speed, and humidity. The application is built with [Node.js](https://nodejs.org/en) and utilizes the [OpenWeather API](https://openweathermap.org/api) for weather data. It uses [Express](https://expressjs.com/) for API communication and was tested using [Render](https://render.com/), though it can be deployed in any environment.

 ----

## Features

* Real-time current weather data and the 5-Day Forecast

* Search functionality for global locations

* Displays temperature, wind speed, and humidity

* Stores previously searched cities for quick access
  
----

## Media

### Screenshot

![Weather Dashboard Screenshot](Assets/new-weather-cap.png)

----

## Table of Contents

- [Weather Dashboard - API Usage](#weather-dashboard---api-usage)
  - [Description](#description)
  - [Features](#features)
  - [Media](#media)
    - [Screenshot](#screenshot)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [License](#license)

----

## Installation

Before running the application,follow these steps:
  
1. Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
  
2. Clone the repository and navigate to the project directory.

3. Install the dependencies using the command-line command:

   ```bash
   npm install
   ```

----

## Usage

To initialize the application:

1. Create an account at [OpenWeather API](https://openweathermap.org/api) to receive an ```APIKey``` to access the OpenWeather API server.

2. Add your API Key to a ```.env``` file in the projects appropriate directory.

3. Start the application with in the command-line command:
  
   ```bash
   npm start
   ```
  
4. For development mode (Optional to run both the client and server) use:
  
   ```bash
   npm run start:dev
   ```

----

## Deployment

The application was tested on Render, but it can be deployed in any environment. To deploy on Render, follow these steps:

1. Create a new web service on [Render](https://render.com/).

2. Connect your GitHub repository.

3. Set up environment variables, including your OpenWeather ```API key.```

4. Click ```Deploy```

5. Once deployed, access your app at the provided Render URL.

----

## License

This project is licensed under the MIT license.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
