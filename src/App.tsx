import React, { useEffect } from 'react';
import { CloudSun } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';

function App() {
  const { currentWeather, forecast, loading, error, fetchWeatherData, clearError } = useWeather();

  useEffect(() => {
    // Default city on app load
    fetchWeatherData('Istanbul');
  }, [fetchWeatherData]);

  const handleSearch = (city: string) => {
    clearError();
    fetchWeatherData(city);
  };

  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherData(currentWeather.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <CloudSun className="w-12 h-12 text-white mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Weather App
            </h1>
          </div>
          <p className="text-xl text-white/80">
            Get accurate weather forecasts for any city worldwide
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Weather Content */}
        {!loading && !error && currentWeather && (
          <div className="space-y-8">
            {/* Current Weather */}
            <WeatherCard weather={currentWeather} />

            {/* 5-Day Forecast */}
            {forecast && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white text-center">
                  5-Day Forecast
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((item, index) => (
                    <ForecastCard key={index} forecast={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* API Note */}
        {!loading && !error && !currentWeather && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Welcome to Weather App
            </h3>
            <p className="text-white/70">
              Please implement the API methods in <code className="bg-white/20 px-2 py-1 rounded">src/services/weatherApi.ts</code> to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;