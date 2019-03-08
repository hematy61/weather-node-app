const request = require('request');
const keys = require('../keys.json');

// HTTP request to mapbox API

// making callbacks for geocode to make it reusable
const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${keys.mapbox}`;
  request({
    url: geocodeURL,
    json: true
  }, (error, response) => {
    // Error Handling
    // there are 3 types of errors here: 
    // 1- the errors that "request" sending back, like internet connection problems and
    // 2- the errors that are coming from Mapbox API, like "invalid locations". These are the errors that
    // are coming within the body of "response" and we can catch them here in else if statements.
    if (error) {
      callback('Unable to connect to the location service!', undefined)
    } else if (response.body.message) {
      callback(response.body.message, undefined)
    } else if (response.body.features.length === 0) {
      callback(`We are sorry. The ${response.body.query} location does not exist in our database!`, undefined)
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  })
}

module.exports = geocode