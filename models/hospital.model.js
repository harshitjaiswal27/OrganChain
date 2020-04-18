const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

var hospitalSchema= mongoose.Schema({
    username: {type: String, required: true},
	password: {type: String, required: true },
	hospitalpublickey: {type: String, required:true},
	address: {type:String, required:true},
    contact: {type:String, required:true},
	city: {type : String, required: true},
	img: {type: String}
});

hospitalSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

hospitalSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('hospital',hospitalSchema);
