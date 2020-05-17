/* src/routes/album */
const express = require('express');
const songController = require('../controllers/songs');
const albumController = require('../controllers/albums');

const router = express.Router();

router.get('/:albumId', albumController.getAlbumById); //route not testing proper

router.post('/:albumId/song', songController.createSong);

router.get('/:albumId/all-tracks', songController.getAlbumTracks);

module.exports = router;