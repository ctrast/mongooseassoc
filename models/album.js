const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    songText: String,
  },
  { timestamps: true }
);

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
    },
    songs: [songSchema],
  },
  { timestamps: true }
);

const Album = mongoose.model('Album', albumSchema);
const Song = mongoose.model('Song', songSchema);

module.exports = { Album, Song };

