const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');
var md5 = require("blueimp-md5");
const jwt = require('jsonwebtoken');
const config = require('../config/constants.js')

router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
router.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect: '/users/login',
    failureFlash : true
})(req,res,next)
})
  router.post('/register',(req,res)=>{
    const {name,email, password, password2} = req.body;
    let errors = [];
    console.log(' Name:' + name+ ' email:' + email+ ' pass:' + password);
    if(!name || !email || !password || !password2) {
        errors.push({msg : '<div class="error">Please fill in all fields</div>'})
    }
    if(password !== password2) {
        errors.push({msg : '<div class="error">Passwords dont match'});
    }
    
    if(password.length < 6 ) {
        errors.push({msg : '<div class="error">Password atleast 6 characters</div>'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2})
     } else {
       User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'email already registered'});
            res.render('register',{errors,name,email,password,password2})  
           } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password,
                emailmd5  :  md5(email),
                userid  :  Buffer.from(Date.now().toString()).toString('base64')
            });
            const token = jwt.sign({
                data: newUser.email
                }, config.JWT_SECRET, { expiresIn: '10m' }  
            );    

            console.log(`${token}/${newUser.emailmd5}`)
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        newUser.password = hash;
                    newUser.save()
                    .then((value)=>{
                        transporter.sendMail(mailConfigurations, function(error, info){
                            if (error) throw Error(error);
                            console.log('Email Sent Successfully');
                            console.log(info);
                        });

                        console.log("Email hash" + newUser.emailmd5)
                        console.log(value)
                        
                        req.flash('success_msg','You have now registered!');
                        res.redirect('/users/login');
                    })
                    .catch(value=> console.log(value));
                      
                }));
             }
       })
    }
    })

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','Now logged out');
    res.redirect('/users/login'); 
})
module.exports  = router;