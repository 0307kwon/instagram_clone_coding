const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../../custom_module/myMulterStorage");
const upload = multer({storage:storage,});

const post_db = require("../../custom_module/post_db"); 

const ReadByPostId = require("../../custom_module/readByPostId");

router.get("/:post_id", ReadByPostId,(req,res)=>{
    const id = req.params.post_id;
    const account_name = req.post.account_name;
    const contents = req.post.contents;
    res.render("post_update",{
        title:"Post 수정",
        post_id:id,
        account_name:account_name,
        contents:contents,
    });
});

router.post("/process/:post_id",ReadByPostId,upload.single("uploaded_file"),(req,res)=>{
    const post_id = req.params.post_id;
    //파일은 upload.single에 의해 알아서 저장됨
    //db 업데이트
    post_db.Post.updateOne({_id:post_id,},req.post_changed,(err,post)=>{
        if(err) throw err;
        const page = `
        <script>alert("수정되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    })
});

module.exports = router;