const config = require('config');
const express = require('express');
const { Pokemon } = require('../models/pokemon');
const { User } = require('../models/user');
const axios = require('axios');
const auth = require('../middleware/auth')
const router = express.Router();



router.get('/', auth, async (req, res) => {
    const userId = req.user._id;
    console.log(userId);
    const pokemons = await Pokemon.find({ 'likes': userId }).sort('name');
    res.send(pokemons)
})


router.post('/', auth, async (req, res) => {

    const user = req.user._id;

    const pokemon = await Pokemon.findById(req.body._id);
    if (!pokemon) return res.status(400).send("Invalid Pokemon");

    //Firt find in database if its already liked delete it
    console.log(pokemon.likes.includes(user));
    if (pokemon.likes.includes(user)) {
        filteredItems = pokemon.likes.filter(u => u != user)
        pokemon.likes = [...filteredItems];
    } else {
        pokemon.likes = [...pokemon.likes, user];
    }

    console.log(pokemon);

    pokemon.save();

    res.status(200).send();
});

module.exports = router;

