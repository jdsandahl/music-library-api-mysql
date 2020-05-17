/* src/controllers/albums.js */
const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');

exports.createAlbum = (req, res) => {
  const { artistId } = req.params;

  Artist.findByPk(artistId).then(artist => {
    if (!artist){
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.create(req.body).then(album => {
        album.setArtist(artistId).then(linkedAlbum => {
          res.status(201).json(linkedAlbum);
        });
      });
    }
  });
};

//NOW PASSING E2E and Unit Tests
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