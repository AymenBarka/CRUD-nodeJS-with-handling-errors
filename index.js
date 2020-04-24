var express=require('express');
var bodyParser=require('body-parser');
var db=require('./db/database');
var userapi=require('./routes/api/UserApi');
var AffectTodoToUser=require('./routes/api/AffectTodoToUser');
var DeleteTodoFromUser=require('./routes/api/DeleteTodoFromUser');
var mail=require('./routes/api/Mail');
var img = require('./routes/api/imgUploads');
require('./passport');
var cron = require('node-cron');
 
cron.schedule('*/2 * * * *', () => {
  console.log('running a task every two minutes');
});
//set up express app

var app=express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//initialize routes
app.use('/api',require('./routes/api/TodosApi'));
app.use('/users',userapi);
app.use('/AffectTodoToUser',AffectTodoToUser);
app.use('/DeleteTodoFromUser',DeleteTodoFromUser);
app.use('/mail',mail);
app.use('/img',img);
//app.use('/users', passport.authenticate('bearer', { session : false }), secureRoutes );

//error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error:err.message});
})

//listen for requests
app.listen(process.env.port||5000,function(){
    console.log('now listening for requests');
    });