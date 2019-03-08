const request = require('request');
const keys = require('../keys.json');

// HTTP request to darksky API


const weather = (longitude, latitude, callback) => {
  const weatherURL = `https://api.darksky.net/forecast/${keys.darksky}/${latitude},${longitude}?units=si`;
  request({
    url: weatherURL,
    json: true
  }, (error, { body = {} }) => {
    // Error Handling
    // there are 2 types of errors here: 
    // 1- the errors that "request" sending back, like internet connection problems and
    // 2- the errors that are coming from darksky API, like "invalid locations". These are the errors that
    // are coming within the body of "response" and we can catch them here in else if statement.
    if (error) {
      callback('Unable to connect to the weather service', undefined)
    } else if (body.error) {
      callback(body.error, undefined)
    } else {
      callback(undefined, `The temperature is ${body.currently.temperature} with ${body.currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = weather
