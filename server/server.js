const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // Converts data body into JSON format (originally bodyParser)

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connection established successfully!"))
    .catch(error => console.log(error));

// Middleware

const { User } = require('./models/user');

// Put this into routes folder in the future
app.post('/api/user/signup', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    }).save((err, response) =>{
        if(err) res.status(400).send(err);
        res.status(200).send(response);
    })
})

app.post('/api/user/signin', (req, res) =>{
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



app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});


