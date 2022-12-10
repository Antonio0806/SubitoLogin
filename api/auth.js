const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const config = require('../config/constants.js');
const bcrypt = require('bcrypt');

module.exports = function(req, res, next) {
    if(req.params.apikey == config.API_KEY) {
        bcrypt.genSalt(10,(err,salt)=> 
        bcrypt.hash(req.params.password,salt,
            (err,hash)=> {
                 if(err) throw err;
                User.findOne({email : req.params.email}).exec((err,user)=>{
                    if(req.params.password == user.passwordC) {
                        var response = {
                            message: 1,
                            token: user.emailmd5,
                            emailmd5: user.emailmd5,
                            name: user.name  
                        };
                        res.send(JSON.stringify(response));
                    } else {
                        var response = {
                            message: 2,
                            token: 0,
                            emailmd5: 0,
                            name: 0  
                        };
                        res.send(JSON.stringify(response));
                    }

                    
                      
                })

        }));      
    } else {
        res.status(403).send('Wrong API key.')
    }
}