//todo: add an api call for getting all the app integrations.
//params: apikey, jwtaccounttoken, username
//returns: json format integrations
const constants = require("../config/constants")
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const e = require("connect-flash");

module.exports = function(req, res, next) {
    if(req.params.apikey == constants.API_KEY) {
        try {
            var decoded = jwt.verify(req.params.jwtaccounttoken, constants.JWT_SECRET);
            if (decoded != undefined) {
                User.findOne({name : req.params.username}).exec((err, user) => {
                    if(user == null) {
                        var response = {
                            message : 2,
                            data :  0
                        }
                        res.send(JSON.stringify(response));
                    }else {
                        var response = {
                            message : 1,
                            data : user.integrations
                        }
                        res.send(JSON.stringify(response));
                    }
                });
            }
          } catch(err) {
            var response = {
                message : 2,
                data : 0
            }
            res.send(JSON.stringify(response));
          }
    } else {
        res.sendStatus(401).send('Bad api key');
    }
}