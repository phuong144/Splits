const router = require('express').Router();
let User = require('../models/user-model');
let mongoose = require('mongoose');
let db = mongoose.connection;
require('dotenv').config();
// Retrieve
var MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_URI;

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signup').post((req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        split:"ppl",
    }).save((err, response) =>{
        if(err) res.status(400).send(err);
        res.status(200).send(response);
    })
})

router.route('/signin').post((req, res) =>{
    //Checks if email is present or not
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) res.json({message: 'Login failed, user not found'})
        //console.log(user + "this is a user");
        //console.log(user.split); works

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


router.route('/workout').post((req,res) => {
    // Get user Split, ex User.split == 'ppl'
    //Split.'ppl'.get/
    //return data

    User.findOne({'email': req.body.email}, function (err, user){
        let split = user.split;
        const client = new MongoClient(uri, { useNewUrlParser: true });

        client.connect(err => {
            if(err){ return console.dir(err);}
            var Splits = client.db("test").collection('Splits');
            
            Splits.findOne({_id : split}, function(err, routine){
                if(err) throw err;
                console.log(routine);
                res.status(200).send(routine);
            })
            client.close();
        })

        
    })
})

module.exports = router;