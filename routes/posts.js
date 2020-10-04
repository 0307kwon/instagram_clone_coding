const { resolveSoa } = require("dns");
const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/process_create", (req,res)=>{
    title = req.body.title;
    contents = req.body.contents;

    fs.writeFile(`./posts/${title}`,contents,(err)=>{
        res.status(300).redirect("/?alert=post_make"); 
    });

})

router.get("/create",(req,res)=> {
    res.render("post_create",{
        title:"Post 생성",
    });
})

router.get("/:postId",(req,res)=>{
    const postId = req.params.postId;
    fs.readFile(`./posts/${postId}`,"utf8",(err,data) =>{
        res.render("post",{
            title: postId,
            contents: data,
        })
    })
})


module.exports = router;