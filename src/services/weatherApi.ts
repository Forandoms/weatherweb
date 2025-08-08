import { CurrentWeather, WeatherForecast } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

export class WeatherAPI {
  static async getCurrentWeather(city: string): Promise<CurrentWeather> {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found or API error');
    }
    
    const data = await response.json();
    
    return {
      weather: data.weather,
      main: data.main,
      wind: data.wind,
      visibility: data.visibility,
      name: data.name,
      country: data.sys.country
    };
  }

  static async getForecast(city: string): Promise<WeatherForecast> {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not available');
    }
    
    const data = await response.json();
    
    return {
      list: data.list,
      city: {
        name: data.city.name,
        country: data.city.country
      }
    };
  }

  static async searchCities(query: string): Promise<any[]> {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City search failed');
    }
    
    return await response.json();
  }
}