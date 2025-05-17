# Weather Dashboard API Documentation

> **Note:**
> These API endpoints are intended for use in development mode and can be tested using API clients such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).
> Make sure your server is running and you have a valid OpenWeather API key in your `.env` file.

---

## Endpoints

### POST `/api/weather/`

- **Description:** Get current weather and 5-day forecast for a city.
- **Request Body:**
  ```json
  { "cityName": "San Diego" }
  ```
- **Response:**
  ```json
  [
    {
      "city": "San Diego",
      "date": "2025-05-17T00:00:00Z",
      "icon": "01d",
      "iconDescription": "clear sky",
      "tempF": 75,
      "windSpeed": 5,
      "humidity": 60
    }
    // ...forecast objects
  ]
  ```

---

### GET `/api/weather/history`

- **Description:** Get the list of previously searched cities.
- **Response:**
  ```json
  [
    { "name": "San Diego", "id": "1715900000000" },
    { "name": "London", "id": "1715900050000" }
  ]
  ```

---

### DELETE `/api/weather/history/:id`

- **Description:** Delete a city from the search history by its ID.
- **Response:**
  ```json
  { "message": "City removed from search history" }
  ```

---
