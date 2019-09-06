const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('config');
const { Pokemon } = require('../models/pokemon');

const router = express.Router();


router.get('/', async (req, res) => {

    if (req.query.favourites) {
        const token = req.headers['x-auth-token'];
        if (token) {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded;
            console.log(req.user._id);
            if (req.user) {
                $favourites = { 'likes': req.user._id };
                Object.assign(req.query, $favourites);
                delete req.query['favourites'];

            }
        }
    }

    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    if (req.query.name) {
        const regex = new RegExp(escapeRegex(req.query.name), 'gi');
        req.query.name = regex;
    }

    try {
        const pokemons = await Pokemon
            .find({ $and: [req.query] })
            .sort('name');
        res.send(pokemons)
    } catch (ex) {
        console.log(ex);
    }


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