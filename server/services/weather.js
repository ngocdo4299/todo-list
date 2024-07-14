const axios = require('axios').default;
const { CITIES } = require('../constant');

const weatherData = {};
const weatherApiKey = process.env.WEATHER_API_KEY

function isCached(date) {
  if (!date || (date == undefined)) {
    return false;
  }

  const now = Date.now();
  const timeLimit = Number(process.env.WEATHER_CACHE_TIME || 1800000)
  const cacheTimeLimit = now - timeLimit;
  return date > cacheTimeLimit;
}

exports.getWeatherData = async (location) => {
  const [lat, lon] = CITIES[location];
  if (isCached(weatherData[location]?.lastFetch)) {
    return weatherData[location].data;
  } else {
    const weatherDetail = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`)
    weatherData[location] = {
      data: weatherDetail.data,
      lastFetch: Date.now()
    }
    return weatherDetail.data;
  }
}