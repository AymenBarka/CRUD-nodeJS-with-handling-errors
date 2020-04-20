var express=require('express');
var Todo=require('../../models/todoSchema');
var router=express.Router();
//get a list of todo from db
router.get('/getAll', function(req,res,next){
    Todo.find({}).then(function(todo){
        res.send(todo);
    });
});
//get one todo from db
router.get('/getOne/:id', function(req,res,next){
    Todo.findById({_id:req.params.id}).then(function(todo){
        res.send(todo);
    });
    });
//add a new todo to the db
router.post('/addComment', function(req,res,next){
    Todo.create(req.body).then(function(todo){
    res.send(todo);
        
    }).catch(next);
    });
//update todo  in the db 
 router.put('/updateOne/:id', function(req,res,next){
     Todo.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
         Todo.findOne({_id:req.params.id}).then(function(todo){
            res.send(todo);

         });
     });
    });

    //delete todo from db
router.delete('/deleteOne/:id', function(req,res,next){
    Todo.findByIdAndRemove({_id:req.params.id}).then(function(todo){
       res.send(todo) 
    });
    });
    module.exports=router;