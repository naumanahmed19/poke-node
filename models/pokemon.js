const mongoos = require('mongoose');

const Pokemon = mongoos.model('Pokemon', new mongoos.Schema({
    image: String,
    name: String,
    weight: Number,
    height: Number,
    base_experience: Number,
    date: { type: Date, default: Date.now },
}));


exports.Pokemon = Pokemon;