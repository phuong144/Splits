const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser");

require('dotenv').config();

const passport = require("passport");
const users = require("./routes/api/users");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Converts data body into JSON format (originally bodyParser)
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connection established successfully!"))
    .catch(error => console.log(error));

// Middleware

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

/*
//  Old model/route
app.use('/User', userRouter);
*/
app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});


