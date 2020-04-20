const router = require('express').Router();
const jwt   = require('jsonwebtoken');
const Hospital = require('../../models/hospital.model');

router.route('/:city').get((req,res)=>{
    Hospital.find({
        city : req.params.city
    })
    .then(hospitals=> {
        res.send(hospitals)
    })
    .catch(err => res.status(400).json('Error:'+err));
}); 

router.route('/login').post((req,res)=>{
    const {username, password} = req.body;
    Hospital.findOne({ username })
        .then( hospital => {
            if(!hospital) return res.status(400).json({ msg : 'User does not exist' });
            if (!hospital.validPassword(password)) return res.status(400).json({ msg : 'Invalid Credentials!'});

            jwt.sign({hospital}, 'Think=>Code=>Build=>Hack', (err, token)=>{
                if(err) throw err;
                res.json({ token });
            })
        })
})

router.route('/profile/:publicKey').get((req,res)=>{
    Hospital.findOne({ hospitalpublickey :req.params.publicKey })
        .then(hospital=>{
            res.send(hospital)
        })
        .catch(err => res.status(400).json('Error:'+err));
})

module.exports = router;