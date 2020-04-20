var express=require('express');
var bodyParser=require('body-parser');
var db=require('./db/database');
//set up express app

var app=express();


app.use(bodyParser.json());

//initialize routes
app.use('/api',require('./routes/api/TodosApi'));
//error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error:err.message});
})

//listen for requests
app.listen(process.env.port||5000,function(){
    console.log('now listening for requests');
    });