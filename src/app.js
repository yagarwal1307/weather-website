const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name:'Yash Agarwal'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Yash Agarwal'
  } )
})

app.get('/help', (req, res) => {
  res.render('help',{
    title: 'Help',
    name: 'Yash Agarwal',
    helpText: 'This is some helpful text'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address string'
    })
  }

  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({
        error: error
      })
    }

    forecast(response.latitude, response.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error
        })
      }

      res.send({
        address: req.query.address,
        location: response.location,
        forecast: forecastData
      });

    });

  });
  
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Yash Agarwal',
    error: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Yash Agarwal',
    error: 'Page not found.'
  })
})
//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
  console.log('Server is up on port '+ port)
})