const mongoose = require('mongoose');

const pokemonScheme = new mongoose.Schema({
    image: String,
    name: String,
    weight: Number,
    height: Number,
    base_experience: Number,
    date: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
pokemonScheme.index({ name: 'text' });

const Pokemon = mongoose.model('Pokemon', pokemonScheme);


exports.Pokemon = Pokemon;