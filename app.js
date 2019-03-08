

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');



geocode('los angeles', (error, geocodeData) => {
  if (error) {
    return console.log(error)
  }
  
  weather(geocodeData.longitude, geocodeData.latitude, (error, weatherData) => {
    if (error) {
      return console.log(error)
    }
    console.log(geocodeData.location)
    console.log(weatherData)
  });
});

