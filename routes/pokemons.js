const express = require('express');
const { Pokemon } = require('../models/pokemon');

const router = express.Router();

router.get('/', async (req, res) => {
    const pokemons = await Pokemon.find().sort('name');
    res.send(pokemons)
})

router.get('/:id', async (req, res) => {
    const pokemons = await Pokemon.findById(req.params.id);
    res.send(pokemons)
})

router.post('/', async (req, res) => {
    try {
        let pokemon = new Pokemon({
            image: req.body.image,
            name: req.body.name,
            weight: req.body.weight,
            height: req.body.height,
        });
        res.send(pokemon)

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;