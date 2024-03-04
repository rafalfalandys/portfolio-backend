const Photo = require('../models/photoModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllPhotos = catchAsync(async (req, res) => {
  const features = new APIFeatures(Photo.find(), req.query).filter().sort().limitFields().paginate();

  const photos = await features.query;

  res.status(200).json({
    status: 'success',
    results: photos.length,
    data: { photos },
  });
});

exports.getPhoto = catchAsync(async (req, res, next) => {
  const photo = await Photo.findById(req.params.id);

  if (!photo) return next(new AppError(404, 'No photo found with that ID.'));

  res.status(200).json({ status: 'success', data: { photo } });
});

exports.createPhoto = catchAsync(async (req, res, next) => {
  const newPhoto = await Photo.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      photo: JSON.parse(JSON.stringify(newPhoto)),
    },
  });
});

exports.updatePhoto = catchAsync(async (req, res, next) => {
  const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!photo) return next(new AppError(404, 'No photo found with that ID.'));

  res.status(200).json({ status: 'success', data: { photo } });
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const photo = await Photo.findByIdAndDelete(req.params.id);

  if (!photo) return next(new AppError(404, 'No photo found with that ID.'));

  res.status(204).json({ status: 'success', data: null });
});
