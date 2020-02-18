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

const userRouter = require('./routes/users');

app.use('/users', userRouter);



app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});


