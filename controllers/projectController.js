const Project = require('../models/projectModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Project.find(), req.query).filter().sort().limitFields().paginate();

  const projects = await features.query;

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: { projects },
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  // Project.findOne({ _id: req.params.id })
  const project = await Project.findById(req.params.id);

  if (!project) return next(new AppError(404, 'No project found with that ID.'));

  res.status(200).json({ status: 'success', data: { project } });
});

exports.createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      project: JSON.parse(JSON.stringify(newProject)),
    },
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) return next(new AppError(404, 'No project found with that ID.'));

  res.status(200).json({ status: 'success', data: { project } });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) return next(new AppError(404, 'No project found with that ID.'));

  res.status(204).json({ status: 'success', data: null });
});
