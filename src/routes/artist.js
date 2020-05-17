/* src/routes/artist */

const express = require('express');
const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');

const router = express.Router();

router
  .route('/')
  .post(artistController.create)
  .get(artistController.getAllArtists);

router
  .route('/:artistId')
  .get(artistController.getArtistById)
  .patch(artistController.updateArtist)
  .delete(artistController.deleteArtist);

router
  .route('/:artistId/albums')
  .post(albumController.createAlbum)
  .get(albumController.getAlbumsByArtist);

//POSSIBLE UNECESSARY ENDPOINT/REQUEST
router.get('/:artistId/albums/:albumId', albumController.getSingleAlbumByArtist);

module.exports = router;