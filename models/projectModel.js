const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project must have a title'],
    trim: true,
  },
  tytul: {
    type: String,
    required: [true, 'Project must have a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project must have a name'],
    trim: true,
  },
  opis: {
    type: String,
    required: [true, 'Project must have an opis'],
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    required: [true, 'Project must have an order'],
  },

  images: {
    type: [
      {
        name: String,
        thumbnail: String,
        type: { type: String },
        url: String,
      },
    ],
  },
  role: {
    type: [
      {
        type: String,
        enum: {
          values: ['designer', 'student', 'coordinator', ''],
          message: 'role is "designer", "student" or "coordinator"',
        },
      },
    ],
    required: [true, 'Project must have role'],
  },
  tags: { type: [String], required: [true, 'Project must have tags'] },
  yearStart: { type: Number, required: [true, 'Project must have a year'] },
  yearEnd: {
    type: Number,
    default: function () {
      return this.yearStart;
    },
  },
  createdAt: { type: Date, default: Date.now(), select: false },
  id: String,
});

projectSchema.pre('save', function (next) {
  this.id = slugify(this.title, { lower: true });
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
