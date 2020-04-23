var mongoose=require("mongoose");
var todoSchema=new mongoose.Schema({
    
    comment: String,

});
var Todo=mongoose.model('todo', todoSchema);
module.exports=Todo;