const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../depends_config/auth') 

router.get('/', (req,res)=>{
    res.render('welcome');
})
router.get('/register', (req,res)=>{
    res.render('register');
})
//router.get('/dashboard',ensureAuthenticated,(req,res)=>{
router.get('/dashboard',(req,res)=>{ //DEV ONLY REMOVE BEFORE RELEASE!
    res.render('dashboard',{
        user: req.user,
        emailmd5test: 'd3bfb84ce28b8dd70d7eecb953083ac3'
    });
})
module.exports = router; 