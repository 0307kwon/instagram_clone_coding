const express = require("express");
const router = express.Router();

const fs = require("fs");
const ReadByPostId = require("../../custom_module/readByPostId");
const post_db = require("../../custom_module/post_db");

router.get("/:post_id", ReadByPostId,(req,res)=>{
    const id = req.params.post_id;
    const post_readed = req.post;

    const page = `
        <script>alert("삭제되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
    `;
    //db에서 삭제
    post_db.Post.deleteOne({_id:id,},(err,post)=>{
        if(err) throw err;
    }).then((value)=>{
        if(post_readed.filename_image !== ""){ // image도 있으면 삭제
            fs.unlink(`./public/post_images/${post_readed.filename_image}`,(err)=>{
                if(err) throw err;
                res.send(page);
            });
        }else{
            res.send(page);
        }
    });
    //
});

module.exports = router;