const mongoose = require('mongoose');

const donorSchema= mongoose.Schema({
    fname: {type: String, required:true},
    lname: {type: String, required:true},
    gender: {type: String, required:true},
    city: {type:String, required:true},
    phone: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    bloodgroup: {type: String, required:true},
    organ: {type: String, required:true}
});

module.exports = mongoose.model('donor',donorSchema);
