const Hospital = require('../models/hospital.model');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/OrganChain', {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connection Established with Test Database!")
});



var hospitals = [new Hospital({
	username: 'Ace Hospital',
	password: (new Hospital()).generateHash("Admin123"),
	hospitalpublickey: '0x68099feE8C881F514dfd6A38fe4F72B9CA5F52e3',
	address: 'Survey No. 32/2A, Pune, Maharashtra',
	contact: '020-25434063',
	city: 'Pune',
	img: 'ace.jpg'
}),
new Hospital({
	username: 'AIIMS Delhi',
	password: (new Hospital()).generateHash("Admin123"),
	hospitalpublickey: '0x3B38705F2f0839EcfEe2622b867073e6146fEacd',
	address: 'Aurobindo Marg, New Delhi',
	contact: '011-26588500',
	city: 'New Delhi',
	img: 'aiims.jpg'
}),
new Hospital({
	username: 'Fortis Hospital',
	password: (new Hospital()).generateHash("Admin123"),
	hospitalpublickey: '0xEe24e5C62A83c96B1De4b041Bd0b870E6202B5A6',
	address: 'Sector B-1, vasant kunj, New Delhi',
	contact: '011-42776222',
	city: 'New Delhi',
	img: 'fortis.jpg'
}),
new Hospital({
	username: 'GB Pant Hospital',
	password: (new Hospital()).generateHash("Admin123"),
	hospitalpublickey: '0x3CA1077784c6e3fddBFbF7C05a102D80d462e6F9',
	address: '1, Jawahar Lal Nehru Marg, New Delhi',
	contact: '011-23234242',
	city: 'New Delhi',
	img : 'gbpant.jpg'
}),
new Hospital({
	username: 'Birla Hospital',
	password:(new Hospital()).generateHash("Admin123"),
	hospitalpublickey: '0x7DeC649AAe2aEFce55Bb4743D9Da4b7D1Bb89dAf',
	address: 'Surya Mandir Road, Near Sun Temple, Opposite Mahaveer Residency, Gwalior, Madhya Pradesh',
	contact: '0751-2405659',
	city: 'Gwalior',
	img: 'birla.jpg'
}),
new Hospital({
	username: 'Apollo Hospital',
	password: (new Hospital()).generateHash("Admin123"),
	hospitalpublickey: '0x939f865B678AbFa04FD49AA0aEe45B84deBDDA57',
	address: '18, Kila Gate Road, Vikas Nagar, Near Sai Baba Mandir, Gwalior, Madhya Pradesh',
	contact: '0751-2454600',
	city: 'Gwalior',
	img: 'apollo.jpg'
}),
new Hospital({
	username: 'Sahara Hospital',
	password: (new Hospital()).generateHash("Admin123"),
	hospitalpublickey: '0x171A1857D52918FC6d865b0A8c001328d142EF98',
	address: '19 A, Vijay Nagar Extension, Basant Vihar Colony, Lashkar, Gwalior, Madhya Pradesh',
	contact: '09926800870',
	city: 'Gwalior',
	img: 'sahara.jpg'
}),
new Hospital({
	username: 'Columbia Asia Hospital',
	password: (new Hospital()).generateHash("Admin123"),
	hospitalpublickey: '0x3008FBe1fCeEF575BB6E1CC6724E1D86441DC338',
	address: '22, 2A, Mundhwa - Kharadi Rd, Near Nyati Empire, Santipur, Thite Nagar, Kharadi, Pune, Maharashtra',
	contact: '020-71290222',
	city: 'Pune',
	img: 'columbia.png'
})];

var done=0;

for(var i=0 ; i<hospitals.length ; i++)
{
	hospitals[i].save(function(err,result){
		console.log(result);
		done++;
		if(done === hospitals.length)
			exit();
	});
}

function exit(){
	mongoose.disconnect();
}
