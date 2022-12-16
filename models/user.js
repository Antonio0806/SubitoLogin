const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
} ,
password :{
    type  : String, 
    required : true
} ,
emailmd5 :{
    type  : String,
    required  :  true
},
date :{
    type : Date,
    default : Date.now
},
isVerified :{
    type : Boolean,
    default : false
},
passwordC :{
    type : String,
    required : true
},
userid :{
    type  :  String,
    require  :  true
},
integrations :{
    type  :  String,
    require  :  false
}
});
const User= mongoose.model('User',UserSchema);

module.exports = User;