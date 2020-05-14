/* src/controllers/artists.js */
const { Artist } = require('../sequelize');

exports.create = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.getAllArtists = (req, res) => {
  Artist.findAll().then(artists => res.status(200).json(artists));
};

exports.getArtistById = (req, res) => {
  const { artistId } = req.params;

  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};

exports.updateArtist = (req, res) => {
  const { artistId } = req.params;

  Artist.update(req.body, { where: { id: artistId } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteArtist = (req, res) => {
  const { artistId } = req.params;

  Artist.destroy({ where: { id: artistId } }).then(deletedArtist => {
    if (!deletedArtist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(204).json(deletedArtist);
    }
  });
};