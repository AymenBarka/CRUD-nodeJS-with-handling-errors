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
router.get('/getUsers', passport.authenticate('bearer', { session: false }), function(req,res,next){
    User.find({},(err,resultat)=>{
       if(err) res.send(err);
        res.send(resultat);
    });
});
//get user from db
router.get('/getuser/:id', passport.authenticate('bearer', { session: false }), function(req,res,next){
    User.findById(req.params.id,(err,resultat)=>{
        if(err)res.send(err);
        res.send(resultat);
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
 router.put('/updateUser/:id', passport.authenticate('bearer', { session: false }), function(req,res,next){
     User.findByIdAndUpdate(req.params.id,req.body,(err,resultat)=>{
         if(err)res.send(err);
            res.send(resultat);  
     });
    });

    //delete user from db
router.delete('/deleteUser/:id', passport.authenticate('bearer', { session: false }), function(req,res,next){
    User.findByIdAndRemove(req.params.id,(err,resultat)=>{
        if(err)res.send(err);
       res.send(resultat) ;
    });
    });
    module.exports=router;