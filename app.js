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
  handler({input}) {

    if (input.length === 0) {
      return console.log('Please enter your address. The command is: node app.js address --input="your address"')
    }

    geocode(input, (error, {longitude, latitude, location}) => {
      if (error) {
        return console.log(error)
      }
      
      weather(longitude, latitude, (error, weatherData) => {
        if (error) {
          return console.log(error)
        }
        console.log(location)
        console.log(weatherData)
      });
    });
  }
});


yargs.parse();

