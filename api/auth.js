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
                    if(user == null) {
                        var response = {
                            message: 3,
                            token: 0,
                            emailmd5: 0,
                            name: 0, 
                            date: 0 
                        };
                    res.send()
                    } else {
                    if(req.params.password == user.passwordC) {
                        var tokensigned = jwt.sign({
                            data: Buffer.from(Date.now().toString()).toString('base64')
                            }, config.JWT_SECRET 
                        );    
                        var response = {
                            message: 1,
                            token: tokensigned,
                            emailmd5: user.emailmd5,
                            name: user.name,
                            date: user.date,
                            isVerified: user.isVerified  
                        };
                        res.send(JSON.stringify(response));
                    } else {
                        var response = {
                            message: 2,
                            token: 0,
                            emailmd5: 0,
                            name: 0, 
                            date: 0 
                        };
                        res.send(JSON.stringify(response));
                    }
                }          
            })
        }));      
    } else {
        res.status(403).send('Wrong API key.')
    }
}