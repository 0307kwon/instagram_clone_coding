const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
const { resolveSoa } = require("dns");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { title } = require("process");

//사용자 모듈
const mydb = require("./post_db.js");
//

router.post("/process_create", (req,res)=>{
    const title = req.body.title;
    contents = req.body.contents;

    const newPost = new mydb.Post({
        title:title,
        contents:contents,
        image_url:"",
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

router.post("/process_update/:post_id",(req,res)=>{
    const post_id = req.params.post_id;

    const revision_title = req.body.title;
    const contents = req.body.contents;

    const post_changed = {
        title:revision_title,
        contents:contents,
        time:new Date(),
    };

    mydb.Post.updateOne({_id:post_id,},post_changed,(err,post)=>{
        if(err) throw err;
        const page = `
        <script>alert("수정되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/posts/${post_id}"></meta>
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
    mydb.Post.deleteOne({_id:id,},(err,post)=>{
        if(err) throw err;
        const page = `
        <script>alert("삭제되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    });

    /*
    fs.unlink(`./posts/${id}`, (err)=>{
        if(err) throw err;
        const page = `
        <script>alert("삭제되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    });
    */
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
        res.render("post",{
            title: post.title,
            post_id: post._id,
            contents: post.contents,
            _delete: true,
            _update: true,
        })
    });
})


module.exports = router;

