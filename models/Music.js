const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    genre: {type: String},
    releaseYear: Number,
    coverImg: String,
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;