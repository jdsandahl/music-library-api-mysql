/* src/routes/artist */

const express = require('express');
const artistController = require('../controllers/artists');

const router = express.Router();

router.post('/', artistController.create);

router.get('/', artistController.getAllArtists);

router.get('/:artistId', artistController.getArtistById);

module.exports = router;
