import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Zap } from 'lucide-react';
import { ForecastItem } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastItem;
}

const getWeatherIcon = (iconCode: string, size: number = 32) => {
  const iconProps = { size, className: "text-white/90" };
  
  if (iconCode.includes('01')) return <Sun {...iconProps} className="text-yellow-300" />;
  if (iconCode.includes('02') || iconCode.includes('03')) return <Cloud {...iconProps} />;
  if (iconCode.includes('04')) return <Cloud {...iconProps} className="text-gray-300" />;
  if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain {...iconProps} />;
  if (iconCode.includes('11')) return <Zap {...iconProps} className="text-yellow-400" />;
  if (iconCode.includes('13')) return <CloudSnow {...iconProps} />;
  
  return <Sun {...iconProps} />;
};

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const time = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-1">{dayName}</h3>
        <p className="text-sm text-white/70 mb-4">{time}</p>
        
        <div className="flex justify-center mb-4">
          {getWeatherIcon(forecast.weather[0].icon)}
        </div>
        
        <div className="mb-3">
          <p className="text-2xl font-bold text-white">
            {Math.round(forecast.main.temp)}°C
          </p>
          <p className="text-sm text-white/60">
            {Math.round(forecast.main.temp_min)}° / {Math.round(forecast.main.temp_max)}°
          </p>
        </div>
        
        <p className="text-xs text-white/80 capitalize leading-tight">
          {forecast.weather[0].description}
        </p>
      </div>
    </div>
  );
};