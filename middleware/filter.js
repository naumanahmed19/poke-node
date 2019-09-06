const jwt = require('jsonwebtoken');
const config = require('config');

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = function (req, res, next) {

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

    //Fuzzy Search
    if (req.query.name) {
        const regex = new RegExp(escapeRegex(req.query.name), 'gi');
        req.query.name = regex;
    }

    next();

}