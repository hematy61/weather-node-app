const request = require('request');
const keys = require('./keys.json');


// HTTP request to darksky API
const weatherURL = `https://api.darksky.net/forecast/${keys.darksky}/37.8267,-122.4233?units=si`;
request({ url: weatherURL, json: true }, (error, response) => {
  // Error Handling
  // there are 2 types of errors here: 
  // 1- the errors that "request" sending back, like internet connection problems and
  // 2- the errors that are coming from darksky API, like "invalid locations". These are the errors that
  // are coming within the body of "response" and we can catch them here in else if statement.
  if (error) {
    console.log('Unable to connect to the weather service')
  }else if (response.body.error) {
    console.log(response.body.error)
  } else {
    const data = response.body.currently;
    console.log(`the temperature is ${data.temperature}`)
  }
});



const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/shiraz.json?access_token=${keys.mapbox}`;

request({ url: geocodeURL, json: true }, (error, response) =>{
  // Error Handling
  // there are 3 types of errors here: 
  // 1- the errors that "request" sending back, like internet connection problems and
  // 2- the errors that are coming from Mapbox API, like "invalid locations". These are the errors that
  // are coming within the body of "response" and we can catch them here in else if statements.
  if (error) {
    console.log('Unable to connect to the map service!')
  }else if (response.body.message) {
    console.log(response.body.message)
  }else if (response.body.features.length === 0) {
    console.log(`We are sorry. The ${response.body.querry} location does not exist in our database!`)
  }else{
    const longitude = response.body.features[0].center[0];
    const latitude = response.body.features[0].center[1];
    console.log(longitude, latitude)
  }
});