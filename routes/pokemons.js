const config = require('config');
const express = require('express');
const { Pokemon } = require('../models/pokemon');
const axios = require('axios');

const router = express.Router();


router.get('/', async (req, res) => {
    const pokemons = await Pokemon.find().sort('name');
    res.send(pokemons)
})

router.get('/:id', async (req, res) => {
    const pokemons = await Pokemon.findById(req.params.id);
    res.send(pokemons)
})




async function importPokemon(url) {
    await axios.get(url)
        .then(function (res) {
            let data = res.data;
            try {
                let pokemon = new Pokemon({
                    image: data.sprites.front_default,
                    name: data.name,
                    weight: data.weight,
                    height: data.height,
                    base_experience: data.base_experience
                });

                const result = pokemon.save()

            } catch (error) {
                console.log(error.message);
            }
        });
}



router.get('/import/data', async (req, res) => {
    await axios.get(config.get('pokeApi'))
        .then(function (response) {
            response.data.results.forEach(async (r) => {
                await importPokemon(r.url);
            });
            res.send({ 'message': 'Data imported successfully' })
        });
})



module.exports = router;