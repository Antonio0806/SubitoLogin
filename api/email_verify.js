const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const config = require('../config/constants.js');

module.exports = function(req, res, next) {
    jwt.verify(req.params.token, config.JWT_SECRET, function(err, decoded) {
        if (err) {
            console.log(err);
            res.send("Email verification failed, prehaps link expired or invalid");
        }
        else {
            User.findOneAndUpdate({emailmd5 : req.params.emailmd5},{isVerified : true}, null, function (err, docs) {
                if (err){
                    console.log(err)
                    res.send("Database got rekt.")
                }
                else{
                    res.send("Email verifified successfully");
                } 
            });
        } 
    }) 
}