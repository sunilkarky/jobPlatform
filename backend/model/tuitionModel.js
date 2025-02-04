const mongoose = require('mongoose');

const tuitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    duration: {
      type: String,
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Tuition = mongoose.model('Tuition', tuitionSchema);
module.exports = Tuition