const Constants = require('../config/constants.js');
const User = require('../models/user.js')
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
var md5 = require("blueimp-md5");

module.exports = function (req,res) {
    if(req.params.apikey == Constants.API_KEY) {
        if(!req.params.name || !req.params.email || !req.params.password || !req.params.password2) {
            res.status(406).send("All fields must be filled up.")
        }
        if(req.params.password !== req.params.password2) {
            res.status(406).send("Passwords do not match.")
        }
        if(req.params.password.length < 6 ) {
            res.status(406).send("Password must be longer than 6.")
        }
        User.findOne({email : req.params.email}).exec((err,user)=>{   
            if(user) {
                res.status(406).send("Email already registered")
               } else {
                const newUser = new User({
                    name : req.params.name,
                    email : req.params.email,
                    password : req.params.password,
                    emailmd5  :  md5(req.params.email),
                    userid  :  Buffer.from(Date.now().toString()).toString('base64')
                });
                console.log('emailmd5: ' + newUser.emailmd5)
                bcrypt.genSalt(10,(err,salt)=> 
                bcrypt.hash(newUser.password,salt,
                    (err,hash)=> {
                        if(err) throw err;
                            newUser.password = hash;
                        newUser.save()
                        .then((value)=>{
                            res.status(200).send(newUser);
                        })
                        .catch(value=> console.log(value));
                    }));
                 }
           })
    } else {
        res.status(403).send("No getting things for ya.")
    }
}