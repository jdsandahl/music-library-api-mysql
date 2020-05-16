/* src/controllers/songs */
const { Album } = require('../sequelize');
const { Song } = require('../sequelize');

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
      //console.log(songData);
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
      Song.findAll({ where: { albumId } }).then(songs => res.status(200).json(songs));
    }
  });
};