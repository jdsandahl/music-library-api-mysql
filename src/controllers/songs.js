/* src/controllers/songs */
const { Album, Artist, Song } = require('../sequelize');

exports.createSong = async (req, res) => {
  const { albumId } = req.params;
  try {
    const album = await Album.findByPk(albumId);
    const songData = {
      name: req.body.name,
      albumId: album.id,
      artistId: album.artistId,
    };
    const song = await Song.create(songData);
    res.status(201).json(song);
  } catch { 
    res.status(404).json({ error: 'The album could not be found '}); 
  };
};

exports.getAlbumTracks = async (req, res) => {
  const { albumId } = req.params;
  try {
    const album = await Album.findByPk(albumId);
    const songs = await Song.findAll({
      include: [
      {
        model: Album,
        as: 'album',
        where: { id: album.id }
      },
      {
        model: Artist,
        as: 'artist'
      }] 
      });
      
    res.status(200).json(songs);
  } catch {
    res.status(404).json({ error: 'The album could not be found.'});
  };
};

exports.updateSong = async (req, res) => {
  const { songId } = req.params;

  Song.update(req.body, { where: { id: songId } }).then(([rowsUpdated]) => {
    if(!rowsUpdated){
      res.status(404).json({ error: 'The song could not be found.'});
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
/*
  try {
    const [rowsUpdated] = await Song.update(req.body, { where: { id: songId } });
    res.status(200).json(rowsUpdated);
  } catch {
    res.status(404).json({ error: 'The song could not be found.'});
  };*/
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