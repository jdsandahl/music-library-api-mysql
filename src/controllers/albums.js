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

exports.getAlbumsByArtist = (req, res) => {
  const { artistId } = req.params;

  Artist.findByPk(artistId).then(artist => {
    if(!artist){
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.findAll({ where: { artistId: artist.id } }).then(albums => res.status(200).json(albums));
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

exports.updateAlbumById = async (req, res) => {
  const { albumId } = req.params;

  /*Album.update(req.body, { where: { id: albumId } }).then(([rowsUpdated]) => {
    if(!rowsUpdated) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });*/
/*
  Album.findByPk(albumId).then((album) => {
    if(!album){
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      Album.update(req.body, {where: { id: albumId } }).then((rowsUpdated) => {
        res.status(200).json(rowsUpdated);
      });
    }
  });
*/
  try {
    const album = await Album.findByPk(albumId);
    const updatedAlbum = await Album.update(req.body, {where: {id: album.id } });
    await res.status(200).json(updatedAlbum);
  } catch {
    await res.status(404).json({ error: 'The album could not be found.' });
  }
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