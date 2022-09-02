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

app.use('/encouragement',encouragementRoute);

//Connect to DB
mongoose.connect('mongodb://10.0.0.4:27017/IBMProject',{})
//1.连接数据库
//mongoose.connect(db_url,{useNewUrlParser:true,useUnifiedTopology:true})
//2.连接成功
mongoose.connection.on('connected',function(){
    console.log('连接成功222：');
})
//3.连接失败
mongoose.connection.on('error',function(err){
    console.log('连接错误：',err);
})
//4.断开连接
mongoose.connection.on('disconnection',function(){
    console.log('断开连接');
})
//console.log('connected to DB'));

//ROUTES
app.get('/', (req,res)=>{
  console.log('111');
  res.send('we are on home');
});


//Listen to the server
app.listen(5000);

