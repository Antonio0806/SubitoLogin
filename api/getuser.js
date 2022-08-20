var config = require('../config/constants.js');
const Constants = require('../config/constants')
const User = require("../models/user");

module.exports = function (req, res) {
    if(req.params.apikey == Constants.API_KEY) {
        User.findOne({userid:  req.params.userid}).exec((err,user)=>{
//          console.log(req.params.userid) --> returns userid in base64
            res.status(200).send(user);
        })
    } else {
        res.status(403).send('No getting things for ya.')
    }
}