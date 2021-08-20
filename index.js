const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.get('/', (req, res) =>{
  res.render('home');
});

const API_KEY = 'd72e96afae1e49f68f80790270407ff3';

app.get('/results', (req, res) => {
  const dish = req.query.food;
  axios
  .get(`https://api.spoonacular.com/food/wine/pairing?food=${dish}&apiKey=${API_KEY}`)
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