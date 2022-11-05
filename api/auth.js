const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const config = require('../config/constants.js');

module.exports = function(req, res, next) {
    if(req.params.apikey == config.API_KEY) {
         
    } else {
        res.status(403).send('Wrong API key.')
    }
}