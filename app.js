const request = require('request');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');


geocode('los angeles', (error, data) => {
  console.log('data: ', data);
  console.log('error: ', error)
});


weather(37.8267, -122.4233, (error, data) => {
  console.log('weather data: ', data)
  console.log('weather error: ', error)
  console.log(`the temperature is ${data}`)
});