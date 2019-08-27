const mongoose = require('mongoose');

const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({
    image: String,
    name: String,
    weight: Number,
    height: Number,
    base_experience: Number,
    date: { type: Date, default: Date.now },
}));


exports.Pokemon = Pokemon;