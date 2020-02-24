require('newrelic');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));

const url = 'http://localhost:'
const reservations = process.env.RESERVATIONS || 1111;
const menus = process.env.MENU || 1112
const reviews = process.env.REVIEWS || 1113;
const photos = process.env.PHOTOS || 1114;


app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
  const restaurantId = req.params.restaurantId;
  const dateTime = req.params.dateTime;
  axios.get(`${url}${reservations}/api/reservations/${restaurantId}/dateTime/${encodeURIComponent(dateTime)}`)
  .then((response) => {
    res.status(200).json(response.data);
  })
  .catch(() => {
    console.log('error getting reservations and dates');
  });
});

app.get('/api/reservations/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  axios.get(`${url}${reservations}/api/reservations/${restaurantId}`)
  .then((response) => {
    res.status(200).json(response.data);
  })
  .catch(() => {
    console.log('error getting reservation id');
  });
});

app.post('/api/reservations/', (req, res) => {
  axios.post(`${url}${reservations}/`, req.body)
  .then((response) => {
    res.status(201).json(response.data)
  })
  .catch(() => {
    console.log('error getting reservation id');
  });
});



const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});