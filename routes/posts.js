const { resolveSoa } = require("dns");
const express = require("express");
const router = express.Router();
const fs = require("fs");


router.get("/create",(req,res)=> {

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