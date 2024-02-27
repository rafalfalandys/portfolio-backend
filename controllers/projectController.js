const Project = require('../models/projectModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllProjects = async (req, res) => {
  try {
    const features = new APIFeatures(Project.find(), req.query).filter().sort().limitFields().paginate();

    const projects = await features.query;

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: { projects },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.getProject = async (req, res) => {
  try {
    // Project.findOne({ _id: req.params.id })
    const project = await Project.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        project: JSON.parse(JSON.stringify(newProject)),
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};
