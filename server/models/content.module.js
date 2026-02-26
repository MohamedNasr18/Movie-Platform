const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['movie', 'series'],
      default: 'movie',
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    genres: {
      type: [String],
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    story: String,

    cast: {
      type: [String],
      required: true,
    },

    hero: {
      type: String,
      required: true,
    },

    director: String,

    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    seasons: {
      type: Number,
      required: function () {
        return this.type === 'series';
      },
    },

    episodes: {
      type: Number,
      required: function () {
        return this.type === 'series';
      },
    },

    poster: String,
  },
  { timestamps: true }
);

movieSchema.index({ type: 1, genres: 1 });
movieSchema.index({ rating: -1 });

module.exports = mongoose.model('Content', movieSchema);
