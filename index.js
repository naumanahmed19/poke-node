const confg = require('config');
const mongoos = require('mongoose');
const express = require('express');
const pokemons = require('./routes/pokemons');
const users = require('./routes/users');
const auth = require('./routes/auth');
const favourites = require('./routes/favourites');


//Setup APP
const app = express();

if (!confg.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey key is not define');
    process.exit(1);
}

//Connect to database
mongoos.connect('mongodb://localhost/poke', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'));



//Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pokemons', pokemons);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/favourites', favourites);


//Port Settings
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening to port 3000'));