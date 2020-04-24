var express=require('express');
var Todo=require('../../models/todoSchema');
var router=express.Router();
//get a list of todo from db
router.get('/getAll', function(req,res,next){
    Todo.find({},(err,resultat)=>{
        if(err) res.send(err);
        res.send(resultat);
    });
});
//get one todo from db
router.get('/getOne/:id', function(req,res,next){
    Todo.findById(req.params.id,(err,resultat)=>{
        if(err)res.send(err);
        res.send(resultat);
    });
    });
//add a new todo to the db
router.post('/addComment', function(req,res,next){
    Todo.create(req.body,(err,resultat)=>{
    if(err) res.send(err);
    res.send(resultat);
        
    });
    });
//update todo  in the db 
 router.put('/updateOne/:id', function(req,res,next){
     Todo.findByIdAndUpdate(req.params.id,req.body,(err,resultat)=>{
         if(err)res.send(err);
            res.send(resultat);       
     });
    });

    //delete todo from db
router.delete('/deleteOne/:id', function(req,res,next){
    Todo.findByIdAndRemove(req.params.id,(err,resultat)=>{
        if(err)res.send(err);
       res.send(resultat) ;
    });
    });
    module.exports=router;