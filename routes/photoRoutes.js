const express = require('express');
const { getAllPhotos, createPhoto, getPhoto, updatePhoto, deletePhoto } = require('../controllers/photoController');

const router = express.Router();

router.route('/').get(getAllPhotos).post(createPhoto);
router.route('/:id').get(getPhoto).patch(updatePhoto).delete(deletePhoto);

module.exports = router;
