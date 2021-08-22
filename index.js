const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
require('dotenv').config();
console.log(process.env)
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.get('/', (req, res) =>{
  res.render('home');
});

app.get('/results', (req, res) => {
  const api_key= process.env.API_KEY;
  const dish = req.query.food;
  axios
  .get(`https://api.spoonacular.com/food/wine/pairing?food=${dish}&apiKey=${api_key}`)
  .then(resp => {
    res.render('results', {
      wines: resp.data
    });
  })
  .catch((error) => {
    console.log(error);
  });
});

app.listen(3000);