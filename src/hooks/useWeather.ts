import { useState, useCallback } from 'react';
import { CurrentWeather, WeatherForecast } from '../types/weather';
import { WeatherAPI } from '../services/weatherApi';

interface UseWeatherState {
  currentWeather: CurrentWeather | null;
  forecast: WeatherForecast | null;
  loading: boolean;
  error: string | null;
}

export const useWeather = () => {
  const [state, setState] = useState<UseWeatherState>({
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const fetchWeatherData = useCallback(async (city: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const [currentWeather, forecast] = await Promise.all([
        WeatherAPI.getCurrentWeather(city),
        WeatherAPI.getForecast(city),
      ]);

      setState({
        currentWeather,
        forecast,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred while fetching weather data',
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    fetchWeatherData,
    clearError,
  };
};