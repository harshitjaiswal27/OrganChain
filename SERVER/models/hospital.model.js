var mongoose = require('mongoose');

var hospitalSchema= mongoose.Schema({
    username: {type: String, required: true},
	password: {type: String, required: true },
	hospitalpublickey: {type: String, required:true},
	address: {type:String, required:true},
    contact: {type:String, required:true},
	city: {type : String, required: true},
	img: {type: String}
});

module.exports = mongoose.model('hospital',hospitalSchema);
