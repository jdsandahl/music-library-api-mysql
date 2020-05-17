/* src/routes/artist */

const express = require('express');
const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');

const router = express.Router();

router.post('/', artistController.create);
router.get('/', artistController.getAllArtists);

router.get('/:artistId', artistController.getArtistById);
router.patch('/:artistId', artistController.updateArtist);
router.delete('/:artistId', artistController.deleteArtist);

router.post('/:artistId/albums', albumController.createAlbum);
router.get('/:artistId/albums', albumController.getAlbumsByArtist);

//POSSIBLE UNECESSARY ENDPOINT/REQUEST
router.get('/:artistId/albums/:albumId', albumController.getSingleAlbumByArtist);


module.exports = router;
