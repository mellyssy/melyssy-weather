import axios from 'axios';
import { getValue } from "./storage.service.js";


async function getWeather(city) {
  const token = await getValue('token');
  if (!token) {
    throw new Error('Token not set, please set the token with -t [API_KEY]');
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      units: 'metric'
    }
  });

  return data;
};

export { getWeather };