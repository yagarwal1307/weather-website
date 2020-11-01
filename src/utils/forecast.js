const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=28e04c64dc98469d3edb4d888bcf20bc&query='+ latitude + ',' + longitude + '&units=m';
  request({ url, json:true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather service')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
    }
  })
}

module.exports = forecast;