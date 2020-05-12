/* src/controllers/artists.js */
const { Artist } = require('../sequelize');

exports.create = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.listAll = (req, res) => {
  Artist.findAll().then(artists => res.status(200).json(artists));
};