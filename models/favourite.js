const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const favouriteSchema = new mongoose.Schema({
    image: String,
    name: String,
});


const Favourite = mongoose.model('Favourite', favouriteSchema);


exports.favouriteSchema = favouriteSchema;
exports.Favourite = Favourite;
