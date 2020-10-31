const mydb = require("./mongoDB");

function readByPostId(req,res,next){
    const id = req.params.post_id;
    mydb.Post.findOne({_id:id,},(err,post)=>{
        if(err) throw err;
        req.post = post;
        next();
    });
}

module.exports = readByPostId;