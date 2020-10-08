const express = require("express");
const router = express.Router();
const ReadByPostId = require("../../custom_module/readByPostId");

router.get("/:post_id",ReadByPostId,(req,res)=>{
    const post_readed = req.post;

    let image_url = "";
    if(post_readed.filename_image !== ""){ // 이미지 파일이 있으면 
        image_url = `/post_images/${post_readed.filename_image}`;
    }
    res.render("post",{
        account_name: post_readed.account_name,
        post_id: post_readed._id,
        image_url:image_url,
        contents: post_readed.contents,
        _delete: true,
        _update: true,
        _create: true,
    })
})

module.exports = router;