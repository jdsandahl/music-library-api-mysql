/* src/routes/song */
const express = require('express');
const songController = require('../controllers/songs');

const router = express.Router();

router.patch('/:songId', songController.updateSong);
router.delete('/:songId', songController.deleteSong);

module.exports = router;
