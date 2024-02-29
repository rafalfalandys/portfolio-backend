const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  url: {
    type: String,
    trim: true,
    required: [true, 'Photo must have an url'],
  },

  thumbnail: {
    type: String,
    trim: true,
    default: function () {
      return this.url;
    },
  },

  type: {
    type: String,
    enum: {
      values: ['img', 'video', 'youtube'],
      message: 'Photo type is "img", "video" or "youtube"',
    },
  },

  order: {
    type: Number,
    required: [true, 'Project must have an order'],
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
