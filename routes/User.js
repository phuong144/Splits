const router = require('express').Router();
let User = require('../models/user-model');
let mongoose = require('mongoose');
let db = mongoose.connection;
require('dotenv').config();
// Retrieve
var MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_URI;

router.route('/').get((req, res) => {
  
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
    let today = new Date();
    let day = today.getDay(); // 0 = Sunday, 1 = Monday, ...
    User.findOne({'email': req.body.email}, function (err, user){
        let split = user.split;
        const client = new MongoClient(uri, { useNewUrlParser: true });

        client.connect(err => {
            if(err){ return console.dir(err);}
            var Splits = client.db("test").collection('Splits');
            
            Splits.findOne({_id : split}, function(err, routine){
                if(err) throw err;
                console.log(routine);

                /*
                if(day == 1){
                    res.status(200).send(routine.split.push1);
                }else if(day == 2){
                    res.status(200).send(routine.split.push2);
                }*/


                res.status(200).send(routine);
            })
            client.close();
        })

        
    })
})

router.route('/switch').post((req,res) => {
    const newsplit = req.body.split
    User.findOneAndUpdate({email:req.body.user.email}, {$set:{split:newsplit}}, {new:true} , function (err, doc){
        if(err){ return console.dir(err);}
        res.status(200).send(doc);
        

        
    })
})

router.route('/switch2').post((req,res) => {
    
    User.findOne({'email': req.body.email}, function(err, user){
        if(!user){
            res.json({message: 'user not found'});
        }
        else{
            res.status(200).send(user);
        }
        //console.log(user + "this is a user");
        //console.log(user.split); works

        // If email is present, compare to password
        
        
        
    })
})

module.exports = router;