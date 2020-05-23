/* src/controllers/albums.js */
const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');

exports.createAlbum = (req, res) => {
  const { artistId } = req.params;

  Artist.findByPk(artistId).then(artist => {
    if (!artist){
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      albumData = {
        name: req.body.name,
        year: req.body.year,
        artistId: artist.id,
      };
      Album.create(albumData).then(album => {
        res.status(201).json(album);
      });
    }
  });
};

exports.getAlbumsByArtist = (req, res) => {
  const { artistId } = req.params;

  Artist.findByPk(artistId).then(artist => {
    if(!artist){
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.findAll({ where: { artistId } }).then(albums => res.status(200).json(albums));
    }
  });
};

//POSSIBLE UNECESSARY ENDPOINT
exports.getSingleAlbumByArtist = (req, res) => {
  const { artistId, albumId } = req.params;

  Artist.findByPk(artistId).then(artist => {
    if(!artist){
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.findByPk(albumId).then(album => {
        if(!album){
          res.status(404).json({ error: 'The album could not be found.' });
        } else {
          res.status(200).json(album);
        }
      });
    }
  });
};

exports.getAlbumById = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then(album => {
    if(!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      res.status(200).json(album);
    }
  });
};

exports.updateAlbumById = (req, res) => {
  const { albumId } = req.params;

  Album.update(req.body, { where: { id: albumId } }).then(([rowsUpdated]) => {
    if(!rowsUpdated) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteAlbum = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then((album) => {
    if(!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      Album.destroy({ where: { id: albumId } }).then((deletedArtist) => {
        res.status(204).json(deletedArtist);
      });
    }
  });
};