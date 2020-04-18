const router = require('express').Router();
let Donor = require('../../models/donor.model');

router.route('/').get((req,res)=>{
    Donor.find()
        .then(donors=> res.json(donors))
        .catch(err => res.status(400).json('Error:'+err));
}); 

router.route('/:email').get((req,res)=>{
    Donor.findOne({email: req.params.email})
        .then(donor=> res.json(donor))
        .catch(err=> res.status(400).json('Error:'+err));
});

router.route('/:email').delete((req,res)=>{
    Donor.deleteOne({email: req.params.email})
        .then(()=> res.json("Donor deleted successfully"))
        .catch(err=> res.status(400).json('Error:'+err));
});

router.route('/').post((req,res)=>{
    Donor.create({
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
    .catch(err => res.status(400).json('Email Registered'));
});

module.exports = router;


