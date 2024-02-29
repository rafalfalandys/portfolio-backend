const Photo = require('../models/photoModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllPhotos = async (req, res) => {
  try {
    const features = new APIFeatures(Photo.find(), req.query).filter().sort().limitFields().paginate();

    const photos = await features.query;

    res.status(200).json({
      status: 'success',
      results: photos.length,
      data: { photos },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { photo } });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.createPhoto = async (req, res) => {
  try {
    const newPhoto = await Photo.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        photo: JSON.parse(JSON.stringify(newPhoto)),
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: 'success', data: { photo } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);

    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};
