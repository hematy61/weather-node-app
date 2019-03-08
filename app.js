const yargs = require('yargs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

yargs.command({
  command: 'address',
  desc: 'Allow user to enter input',
  builder: {
    input: {
      desc: 'the input entered by user',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    if (argv.input.length === 0) {
      return console.log('Please enter your address. The command is: node app.js address --input="your address"')
    }
    geocode(argv.input, (error, geocodeData) => {
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
  }
});


yargs.parse();

