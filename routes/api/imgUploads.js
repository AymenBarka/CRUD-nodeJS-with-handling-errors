var express=require('express');
var User=require('../../models/UserSchema');
var multer=require('multer');

  // define multer storage configuration     

const storage = multer.diskStorage({
    destination : function(req,file,callback){
      callback(null, './upload');
    },
    filename: function(req,file,callback){
        callback(null, file.fieldname + '-' + Date.now());
    }
  });
  
  const upload = multer({ storage : storage});
  
var router = express.Router();
  // ======
  // Upload Image
  // ======
router.post('/uploadfile/:id', upload.single('file'), (req, res) => {
    const file = req.file
    User.findByIdAndUpdate(req.params.id, {$set:{picture: file.originalname}},(err,resultat)=>{
        if(err) res.send(err);
        res.send(resultat)
        console.log("img added");
        
    });
 
  });

module.exports = router;