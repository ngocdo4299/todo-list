export const handleWeatherResponce = (data) => {

  return {
    main: data.weather[0].main,
    description: data.weather[0].description,
    temperature: data.main.temp,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  }
}
export const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
}

export const kelvinToFahrenheit = (kelvin) => {
  return (kelvin - 273.15) * 9 / 5 + 32;
}
