const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../../custom_module/myMulterStorage");
const upload = multer({storage:storage,});

const post_db = require("../../custom_module/post_db");


router.post("/process", upload.single("uploaded_file"),(req,res)=>{
    const account_name = req.body.account_name;
    const contents = req.body.contents;

    let filename_image = "";
    if(req.file !== undefined){
        filename_image = req.file.filename;
    }
    const newPost = new post_db.Post({
        account_name:account_name,
        contents:contents,
        filename_image:filename_image,
        time:new Date(),
    })
    newPost.save().then((value)=>{
        const page = `
        <script>alert("작성되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    });
})

router.get("/",(req,res)=> {
    res.render("post_create",{
        title:"Post 생성",
    });
})

module.exports = router;