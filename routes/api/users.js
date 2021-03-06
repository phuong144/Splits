const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const keys = require("../../config/keys");
require('dotenv').config();
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

let mongoose = require('mongoose');
let db = mongoose.connection;
// Retrieve
var MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_URI;


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    //console.log(req.body.name);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          split:"ppl",
          schedule: {
            1:"push1",
            2:"pull1",
            3:"leg1",
            4:"",
            5:"push2",
            6:"pull2",
            0:"leg1",
            
          }
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
  // Check password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      // User matched
      // Create JWT Payload
      const payload = {
        id: user.id,
        name: user.name
      };
    // Sign token
      jwt.sign(
        payload,
        process.env.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res
        .status(400)
        .json({ passwordincorrect: "Password incorrect" });
    }
});
});
});

router.route('/workout').post(async (req,res) => {
    // Get user Split, ex User.split == 'ppl'
    //Split.'ppl'.get/
    //return data
    
    let weekday = req.body.weekday;
    // console.log("weekday = "+weekday);
    //Sunday - 0, Monday - 1

    //Find the workout associated with the day
    //Query the split and workout and return that

    User.findOne({'_id': req.body.user.id}, async function (err, user){
        let doc = {};
        doc.split = user.split;
        doc.workoutId = user.schedule[weekday];

        if(doc.workoutId === ""){
          doc.weekday = weekday;
          res.status(200).send(doc);
        }else{
          const client =  new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
          client.connect(async (err) => {
              if(err){ return console.dir(err);}
              var Splits = client.db("test").collection('Splits');
              
              Splits.findOne({_id : doc.split}, function(err, routine){
                  if(err) throw err;
                  //console.log(routine);
                  doc.weekday = weekday;
                  doc.workout = routine[doc.split][doc.workoutId];

                  res.status(200).send(doc);
                  return client.close();
              })
          })
        } 
        
    })
})

router.route('/switch').post((req,res) => {
    let defaultPPL = {   
        1:"push1",
        2:"pull1",
        3:"leg1",
        4:"",
        5:"push2",
        6:"pull2",
        0:"leg1",
    }
    let defaultUpperLower = {
        1:"lower1",
        2:"upper1",
        3:"",
        4:"lower2",
        5:"upper2",
        6:"",
        0:"",
    }

    let defaultFull = {
      1:"full1",
      2:"",
      3:"",
      4:"full2",
      5:"",
      6:"",
      0:"",

    }
   
    const newsplit = req.body.split

    if(newsplit === "ppl"){
      User.findOneAndUpdate({_id:req.body.user.id}, 
        {$set:{
            split:newsplit,
            schedule: defaultPPL,
        }}, 
        {new:true, useFindAndModify: false} , 
        function (err, doc){
          if(err){ return console.dir(err);}        
          res.status(200).send(doc);
        })
    }else if(newsplit == 'upper/lower'){
      User.findOneAndUpdate({_id:req.body.user.id}, 
        {$set:{
            split:newsplit,
            schedule: defaultUpperLower,
        }}, 
        {new:true, useFindAndModify: false} , 
        function (err, doc){
          if(err){ return console.dir(err);}
          res.status(200).send(doc);
        })
    }else if(newsplit == "full"){
      User.findOneAndUpdate({_id:req.body.user.id}, 
        {$set:{
            split:newsplit,
            schedule: defaultFull,
        }}, 
        {new:true, useFindAndModify: false} , 
        function (err, doc){
          if(err){ return console.dir(err);}
          res.status(200).send(doc);
        })
    }
    
})

router.route('/getSplit').post((req,res) => {
    User.findOne({'_id': req.body.id}, function(err, user){
        if(!user){
            res.json({message: 'user not found'});
        }
        else{
            res.status(200).send(user);
        }
    })
})


module.exports = router;