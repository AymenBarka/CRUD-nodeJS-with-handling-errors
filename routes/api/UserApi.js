var express=require('express');
var User=require('../../models/UserSchema');
const bearer = require('passport-http-bearer');

var router=express.Router();
const jwt = require("jsonwebtoken");
const passport = require('passport');
// ======
// Login
// ======

router.post('/login', function (req, res) {
    console.log(req.body)
    User.findOne({ email: req.body.email }, (err, userFound) => {
      if (err) res.send(err);
      console.log(req.body.email)
      var token = jwt.sign({ data: userFound }, 'secret', { expiresIn: '1h' });
      res.send({ access_token: token });
    })
  });
 
//get a list of users from db
router.get('/getUsers', function(req,res,next){
    User.find({}).then(function(user){
        res.send(user);
    });
});
//get user from db
router.get('/getuser/:id', function(req,res,next){
    User.findById({_id:req.params.id}).then(function(user){
        res.send(user);
    });
    });

    // ======
// Create
// ======
//add user to the db
router.post('/addUser', function(req,res,next){
    User.create(req.body).then(function(user){
        res.send(user);
    }).catch(next);
    });
//update user in the db 
 router.put('/updateUser/:id', function(req,res,next){
     User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
         User.findOne({_id:req.params.id}).then(function(user){
            res.send(user);

         });
     });
    });

    //delete user from db
router.delete('/deleteUser/:id', function(req,res,next){
    User.findByIdAndRemove({_id:req.params.id}).then(function(user){
       res.send(user) 
    });
    });
    module.exports=router;