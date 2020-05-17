/* src/routes/album */
const express = require('express');
const songController = require('../controllers/songs');
const albumController = require('../controllers/albums');

const router = express.Router();

router.get('/:albumId', albumController.getAlbumById);
router.patch('/:albumId', albumController.updateAlbumById);
router.delete('/:albumId', albumController.deleteAlbum);

router.post('/:albumId/song', songController.createSong);

router.get('/:albumId/all-tracks', songController.getAlbumTracks);

module.exports = router;