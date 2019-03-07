const request = require('request');
const keys = require('./keys.json');

const weatherURL = `https://api.darksky.net/forecast/${keys.darksky}/37.8267,-122.4233?units=si`;
request({ url: weatherURL, json: true }, (error, response) => {
  const data = response.body.currently;
  console.log(`the temperature is ${data.temperature}`)
});



const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/winnipeg.json?access_token=${keys.mapbox}`;

request({ url: geocodeURL, json: true }, (error, response) =>{
  const longitude = response.body.features[0].center[0];
  const latitude = response.body.features[0].center[1];
  console.log(longitude, latitude)
})