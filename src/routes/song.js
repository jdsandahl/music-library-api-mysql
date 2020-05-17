/* src/routes/song */
const express = require('express');
const songController = require('../controllers/songs');

const router = express.Router();

router
  .route('/:songId')
  .patch(songController.updateSong)
  .delete(songController.deleteSong);

module.exports = router;
