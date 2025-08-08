export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindData {
  speed: number;
  deg: number;
}

export interface CurrentWeather {
  weather: WeatherData[];
  main: MainWeatherData;
  wind: WindData;
  visibility: number;
  name: string;
  country: string;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherData[];
  wind: WindData;
  dt_txt: string;
}

export interface WeatherForecast {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}