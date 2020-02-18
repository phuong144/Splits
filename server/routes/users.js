const router = require('express').Router();
let User = require('../models/user-model');

/*
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route('/signup').post((req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    }).save((err, response) =>{
        if(err) res.status(400).send(err);
        res.status(200).send(response);
    })
})

router.route('/signin').post((req, res) =>{
    //Checks if email is present or not
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) res.json({message: 'Login failed, user not found'})

        // If email is present, compare to password
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message:'Wrong Password'
            });
            res.status(200).send('Logged in successfully')
        })
    })
})

module.exports = router;