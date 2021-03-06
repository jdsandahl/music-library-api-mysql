/* src/controllers/songs */
const { Album, Artist, Song } = require('../sequelize');

exports.createSong = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then(album => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found'});
    } else {
      const songData = {
        name: req.body.name,
        albumId: album.id,
        artistId: album.artistId,
      };
      Song.create(songData).then(song => {
        res.status(201).json(song);
      });
    }
  });
};

exports.getAlbumTracks = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then(song => {
    if(!song){
      res.status(404).json({ error: 'The album could not be found.'});
    } else {
      Song.findAll({
        include: [
        {
          model: Album,
          as: 'album',
          where: { id: albumId }
        },
        {
          model: Artist,
          as: 'artist'
        }] 
        })
        .then(songs => res.status(200).json(songs));
    }
  });
};

exports.updateSong = (req, res) => {
  const { songId } = req.params;

  Song.update(req.body, { where: { id: songId } }).then(([rowsUpdated]) => {
    if(!rowsUpdated){
      res.status(404).json({ error: 'The song could not be found.'});
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteSong = (req, res) => {
  const { songId } = req.params;

  Song.findByPk(songId).then(song => {
    if(!song) {
      res.status(404).json({ error: 'The song could not be found.'});
    } else {
      Song.destroy({ where: { id: songId } }).then((deletedSong) => {
        res.status(204).json(deletedSong);
      });
    }
  });
};