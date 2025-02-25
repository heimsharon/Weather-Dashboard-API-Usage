// This file allows for there to be search history by city available to user

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Defined class of City object
class City {
  constructor(
    public name: string,
    public id: string) { }
}
// Defined HistoryService 
class HistoryService {
  private filePath = path.join(__dirname, '../db/db.json');
  private async ensureFileExists() {

    // Checks for a search history file, creates if it does not exist
    try {
      await fs.access(this.filePath);
    } catch (error) {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, '[]');
    }
  }

  // Method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    await this.ensureFileExists();
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  // Write method which adds the last searched city to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

  // Method that reads the cities from the searchHistory.json file and returns them as an array of City objects; to be displayed to the user
  async getCities(): Promise<City[]> {
    return this.read();
  }
  // Method that updates the displayed cities list on the website
  async addCity(city: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(city, Date.now().toString());
    cities.push(newCity);
    await this.write(cities);
  }
  // Method that removes a city for the searchHistory.json file, allowing user to delete
  async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}
// Allows for data to be exported
export default new HistoryService();