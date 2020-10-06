const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
const { resolveSoa } = require("dns");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { title } = require("process");
const path = require("path");
//파일업로드
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        if(req.post === undefined){ //create의 경우
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extention = path.extname(file.originalname);
            const filename_image = file.fieldname + '-' + uniqueSuffix+extention;
            cb(null, filename_image);
        }else{ // update의 경우
            const revision_title = req.body.title;
            const contents = req.body.contents;
            req.post_changed = {
                title:revision_title,
                contents:contents,
                time:new Date(),
            };
            if(req.post.filename_image === ""){ // 이전에 이미지를 저장하지 않은경우
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                const extention = path.extname(file.originalname);
                const filename_image = file.fieldname + '-' + uniqueSuffix+extention;
                cb(null, filename_image);
                req.post_changed.filename_image = filename_image;
            }else{ // 이전에 이미지를 저장한 경우 (이미지 업데이트)
                cb(null, req.post.filename_image);
            }
        }
    }
  });

const upload = multer({storage:storage,});

//
//사용자 모듈
const mydb = require("./post_db.js");
const { strict } = require("assert");
//



router.post("/process_create", upload.single("uploaded_file"),(req,res)=>{
    const title = req.body.title;
    const contents = req.body.contents;

    let filename_image = "";
    if(req.file !== undefined){
        filename_image = req.file.filename;
    }

    const newPost = new mydb.Post({
        title:title,
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

router.use("/process_update/:post_id",(req,res,next)=>{
    mydb.Post.findOne({_id:req.params.post_id,},(err,post)=>{
        if(err) throw err;
        req.post = post;
        next();
    });
});
router.post("/process_update/:post_id",upload.single("uploaded_file"),(req,res)=>{
    const post_id = req.params.post_id;
 
    //db 업데이트
    mydb.Post.updateOne({_id:post_id,},req.post_changed,(err,post)=>{
        if(err) throw err;
        const page = `
        <script>alert("수정되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    })
});

router.get("/create",(req,res)=> {
    res.render("post_create",{
        title:"Post 생성",
    });
})

router.get("/delete/:post_id", (req,res)=>{
    const id = req.params.post_id;

    //이미지 파일부터 삭제
    mydb.Post.findOne({_id:id},(err,post)=>{
        if(err) throw err;
        if(post.filename_image !== ""){ // image가 있으면
            fs.unlink(`./public/images/${post.filename_image}`,(err)=>{
                if(err) throw err;
            });
        }   
    });
    //

    //db에서 삭제
    mydb.Post.deleteOne({_id:id,},(err,post)=>{
        if(err) throw err;
        const page = `
        <script>alert("삭제되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    });
    //
});

router.get("/update/:post_id", (req,res)=>{
    const id = req.params.post_id;

    mydb.Post.findOne({_id:id,},(err,post)=>{
        if(err) throw err;
        res.render("post_update",{
            title:"Post 수정",
            post_id:id,
            title_value:post.title,
            contents_value:post.contents,
        });
    });

    /*
    fs.readFile(`./posts/${id}`, "utf8" , (err,data) =>{
        if(err) throw err;
        const contents_value = data;
        res.render("post_update",{
            title:"Post 수정",
            title_value:id,
            contents_value:contents_value,
        });
    });
    */
});

router.get("/:post_id",(req,res)=>{
    const post_id = req.params.post_id;
    mydb.Post.findOne({_id:post_id,},(err,post)=>{
        if(err) throw err;
        let image_url = "";
        if(post.filename_image !== ""){ // 이미지 파일이 있으면 
            image_url = `/images/${post.filename_image}`;
        }
        res.render("post",{
            title: post.title,
            post_id: post._id,
            image_url:image_url,
            contents: post.contents,
            _delete: true,
            _update: true,
        })
    });
})


module.exports = router;

