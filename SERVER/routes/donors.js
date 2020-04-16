const router = require('express').Router();
let donor = require('../models/donor.model');

router.route('/').get((req,res)=>{
    donor.find()
        .then(donors=> res.json(donors))
        .catch(err => res.status(400).json('Error:'+err));
}); 

router.route('/add').post((req,res)=>{
    donor.create({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email,
        bloodgroup: req.body.bloodgroup,
        organ: req.body.organ
    })
    .then(()=> res.json('Donor added Successfully'))
    .catch(err => res.status(400).send({
        error : {
            message : "Email already Registered"
        }
    }));
});

module.exports = router;


