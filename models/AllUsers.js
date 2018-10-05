const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUser
let AllUser = new Schema({
userType:{type: String},
name: {type: String},
email:{type: String},
password:{type: String},
Pnumber: {type: Number},
gender: {type: String},
cpassword : {type :String}
}
,{
    collection: 'allusers'
});

module.exports = mongoose.model('AllUser', AllUser);

