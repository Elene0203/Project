// const {MongoClient} = require('mongodb');
//
// // Connection URL
// const url='mongodb://localhost:27017';
// const client = new MongoClient(url);
//
// // Database Name
// const dbName = 'IBMProject';
//
// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('Encouragements.js');
//
//   // the following code examples can be pasted here...
//   const encouragements = await collection.aggregate( [ { $sample: { size: 1 } } ] ).toArray();
//   console.log(encouragements);
//   return 'done.';
// }
//
// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

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
app.listen(3000);

