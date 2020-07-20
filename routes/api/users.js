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

/*
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

*/


router.route('/workout').post((req,res) => {
    // Get user Split, ex User.split == 'ppl'
    //Split.'ppl'.get/
    //return data
    let today = new Date();
    let day = today.getDay(); // 0 = Sunday, 1 = Monday, ...
    User.findOne({'_id': req.body.id}, function (err, user){
        let split = user.split;
        const client = new MongoClient(uri, { useNewUrlParser: true });

        client.connect(err => {
            if(err){ return console.dir(err);}
            var Splits = client.db("test").collection('Splits');
            
            Splits.findOne({_id : split}, function(err, routine){
                if(err) throw err;
                //console.log(routine);


                res.status(200).send(routine);
            })
            client.close();
        })

        
    })
})

router.route('/switch').post((req,res) => {
  /*
  const client = new MongoClient(uri, { useNewUrlParser: true });
  //const newsplit = req.body.split
  console.log("id = "+req.body.user.id);
  
  client.connect(err => {
      if(err){ return console.dir(err + " errrrr");}
      var users = client.db("test").collection('users');
      const newsplit = req.body.split;
      console.log(newsplit);
      users.findOneAndUpdate({_id:req.body.user.id}, {$set:{split:newsplit}}, {returnOriginal:false}, function(error, result){
        if (error) { throw error; }

        else { 
          console.log(result.val);
          res.status(200).send(result.val);
        }
      })/*
      .then(updatedDocument =>{
        if(updatedDocument){
          console.log(`Successfully updated document: ${updatedDocument}.`);
          console.log(updatedDocument);
          res.status(200).send(updatedDocument);
        }else{
          console.log("No document matches the provided query.")
          client.close();
          return null;
        }
      }).catch(err => console.error(`Failed to find and update document: ${err}`));
      
      
      client.close();

      
  })
    */
   
    const newsplit = req.body.split
    User.findOneAndUpdate({_id:req.body.user.id}, {$set:{split:newsplit}}, {new:true} , function (err, doc){
        if(err){ return console.dir(err);}
        res.status(200).send(doc);
        
        
    
    })
    
    
    
})


router.route('/switch2').post((req,res) => {
    
    User.findOne({'_id': req.body.id}, function(err, user){
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