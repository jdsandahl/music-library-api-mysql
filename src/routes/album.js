/* src/routes/album */
const express = require('express');
const songController = require('../controllers/songs');

const router = express.Router();

router.post('/:albumId/song', songController.createSong);

module.exports = router;