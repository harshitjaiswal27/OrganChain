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
        .then( user => {
            if(!user) return res.status(400).json({ msg : 'User does not exist' });
            if (!user.validPassword(password)) return res.status(400).json({ msg : 'Invalid Credentials!'});

            jwt.sign({user}, 'Think=>Code=>Build=>Hack', (err, token)=>{
                if(err) throw err;
                res.json({ token });
            })
        })
})

module.exports = router;