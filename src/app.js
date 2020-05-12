const express = require('express');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

const artistController = require('./controllers/artists');

const app = express();

app.use(express.json());

app.post('/artists',artistController.create);

module.exports = app;
