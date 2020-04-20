var mongoose=require("mongoose");
var todoSchema=new mongoose.Schema({
    id:String,
    comment: String,

});
var Todo=mongoose.model('todo', todoSchema);
module.exports=Todo;