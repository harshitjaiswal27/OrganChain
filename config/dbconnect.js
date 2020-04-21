const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/OrganChain', {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connection Established with Test Database!")
});