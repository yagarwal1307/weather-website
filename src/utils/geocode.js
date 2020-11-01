const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFnYXJ3YWwxMzA3IiwiYSI6ImNrZ3VlZXZrcTBqem0ydHBlZmg5eDl3aGUifQ.RhvmEEbKuU3K0aPJL5quTg&limit=1';
  request( { url, json:true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the location services!')
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode;