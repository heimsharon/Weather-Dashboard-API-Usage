# 🌦️ Weather Dashboard API Documentation

> **ℹ️ Note:**
> These API endpoints are intended for use in development mode and can be tested using API clients such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).
> Make sure your server is running and you have a valid OpenWeather API key in your `.env` file.

---

## 🚦 Endpoints

### 📬 POST `/api/weather/`

**Description:**
Get current weather and 5-day forecast for a city.

- **Request Body:**

  ```json
  { "cityName": "San Diego" }
  ```

- **Response:** `200 OK`

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
    // ... additional weather objects
  ]

  ```

 **❌ Error Response:** `400 Bad Request`

  ```json
  { "error": "City name is required." }
  ```

#### 📝 Forecast Object Fields

| 🏷️ Field         | 🗃️ Type | 📝 Description                |
|------------------|---------|-------------------------------|
| city             | string  | Name of the city              |
| date             | string  | ISO date of forecast          |
| icon             | string  | Weather icon code             |
| iconDescription  | string  | Description of weather        |
| tempF            | number  | Temperature in Fahrenheit     |
| windSpeed        | number  | Wind speed (units may vary)   |
| humidity         | number  | Humidity percentage           |

---

### 📖 GET `/api/weather/history`

**Description:**
Get the list of previously searched cities.

- **Response:** `200 OK`

  ```json
  [
    { "name": "San Diego", "id": "1715900000000" },
    { "name": "London", "id": "1715900050000" }
  ]
  ```

- **❌ Error Response:** `500 Internal Server Error`

  ```json
  { "error": "Could not retrieve search history." }
  ```

#### 📝 History Object Fields

| 🏷️ Field | 🗃️ Type | 📝 Description               |
|----------|---------|------------------------------|
| name     | string  | Name of the searched city    |
| id       | string  | Unique identifier for search |

---

### 🗑️ DELETE `/api/weather/history/:id`

**Description:**
Delete a city from the search history by its ID.

- **Response:** `200 OK`

  ```json
  { "message": "City removed from search history" }
  ```

- **❌ Error Response:** `404 Not Found`

  ```json
  { "error": "City not found in search history." }
  ```

---

**🔒 Authentication:**
No authentication is required for these endpoints.

---

**📬 Contact:**
For questions or issues, contact the project maintainer.
