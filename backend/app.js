const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const cors = require('cors');
const app=express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const encouragementRoute = require('./routes/encouragement');
const postRoute = require('./routes/post');

app.use('/encouragement',encouragementRoute);
app.use('/post',postRoute);

//Connect to DB
mongoose.connect('mongodb://localhost:27017/IBMProject',()=>
console.log('connected to DB'));

//ROUTES
app.get('/', (req,res)=>{
  res.send('we are on home');
});


//Listen to the server
app.listen(5000);

