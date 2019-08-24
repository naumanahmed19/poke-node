const mongoos = require('mongoose');
const express = require('express');
const pokemons = require('./routes/pokemons');

const app = express();

const url = 'https://pokeapi.co/api/v2/pokemon/'


mongoos.connect('mongodb://localhost/poke', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'));


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pokemons', pokemons);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening to port 3000'));