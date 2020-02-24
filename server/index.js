require('newrelic');
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());


const reservations = process.env.RESERVATIONS || 5500;
// const menus = process.env.MENU || 5556
// const reviews = process.env.REVIEWS || 5557;
// const photos = process.env.PHOTOS || 5558;


app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
  const restaurantId = req.params.restaurantId;
  const dateTime = req.params.dateTime;
  console.log(req.params);
  axios.get(`http://localhost:5555/api/reservations/${restaurantId}/dateTime/${encodeURIComponent(dateTime)}`)
  .then((response) => {
    console.log('page response!', response);
    res.status(200).json(response.data);
  })
  .catch(() => {
    console.log('error getting reservations and dates');
  });
});

app.get('/api/reservations/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  axios.get(`http://localhost:5555/api/reservations/${restaurantId}`)
  .then((response) => {
    console.log('ID response!', response);
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