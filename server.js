const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Happy Hour Hero';
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/v1/restaurants', (request, response) => {
  database('restaurants').select()
    .then((restaurant) => {
      response.status(200).json(restaurant);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/restaurants/:id', (request, response) => {
  database('restaurants')
    .select()
    .where('id', request.params.id)
    .then(restaurant => response.status(200).json(restaurant)[id])
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;