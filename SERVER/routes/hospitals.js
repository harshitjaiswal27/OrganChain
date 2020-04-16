const router = require('express').Router();
let hospital = require('../models/hospital.model');

router.route('/:city').get((req,res)=>{
    hospital.find({
        city : req.params.city
    })
    .then(hospitals=> {
        res.send(hospitals)
    })
    .catch(err => res.status(400).json('Error:'+err));
}); 

module.exports = router;