const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})
//dashboard page
//router.get('/dashboard',ensureAuthenticated,(req,res)=>{
router.get('/dashboard',(req,res)=>{ //DEV ONLY REMOVE BEFORE RELEASE!
    res.render('dashboard',{
        user: req.user
    });
})
module.exports = router; 