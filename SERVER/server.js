const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./dbconnect');
const port = process.env.PORT || 5000;
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const donorsRouter = require('./routes/donors');
app.use('/donors',donorsRouter);

app.get("/",function(req,res){
    res.send("This is home page");
})

app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
})