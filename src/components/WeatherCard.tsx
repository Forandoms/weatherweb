import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Zap, Eye, Wind, Droplets, Thermometer } from 'lucide-react';
import { CurrentWeather } from '../types/weather';

interface WeatherCardProps {
  weather: CurrentWeather;
}

const getWeatherIcon = (iconCode: string, size: number = 64) => {
  const iconProps = { size, className: "text-white drop-shadow-lg" };
  
  if (iconCode.includes('01')) return <Sun {...iconProps} className="text-yellow-300 drop-shadow-lg" />;
  if (iconCode.includes('02') || iconCode.includes('03')) return <Cloud {...iconProps} />;
  if (iconCode.includes('04')) return <Cloud {...iconProps} className="text-gray-300 drop-shadow-lg" />;
  if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain {...iconProps} />;
  if (iconCode.includes('11')) return <Zap {...iconProps} className="text-yellow-400 drop-shadow-lg" />;
  if (iconCode.includes('13')) return <CloudSnow {...iconProps} />;
  
  return <Sun {...iconProps} />;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          {weather.name}, {weather.country}
        </h2>
        <div className="flex items-center justify-center mb-4">
          {getWeatherIcon(weather.weather[0].icon, 80)}
        </div>
        <div className="text-6xl font-bold text-white mb-2">
          {Math.round(weather.main.temp)}°C
        </div>
        <p className="text-xl text-white/80 capitalize">
          {weather.weather[0].description}
        </p>
        <p className="text-lg text-white/60">
          Feels like {Math.round(weather.main.feels_like)}°C
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <Thermometer className="w-6 h-6 text-white/80 mx-auto mb-2" />
          <p className="text-sm text-white/60">Min/Max</p>
          <p className="text-lg font-semibold text-white">
            {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
          </p>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <Droplets className="w-6 h-6 text-white/80 mx-auto mb-2" />
          <p className="text-sm text-white/60">Humidity</p>
          <p className="text-lg font-semibold text-white">
            {weather.main.humidity}%
          </p>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <Wind className="w-6 h-6 text-white/80 mx-auto mb-2" />
          <p className="text-sm text-white/60">Wind</p>
          <p className="text-lg font-semibold text-white">
            {Math.round(weather.wind.speed)} m/s
          </p>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <Eye className="w-6 h-6 text-white/80 mx-auto mb-2" />
          <p className="text-sm text-white/60">Visibility</p>
          <p className="text-lg font-semibold text-white">
            {Math.round(weather.visibility / 1000)} km
          </p>
        </div>
      </div>
    </div>
  );
};