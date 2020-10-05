const { resolveSoa } = require("dns");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { title } = require("process");

router.post("/process_create", (req,res)=>{
    const title = req.body.title;
    contents = req.body.contents;

    fs.writeFile(`./posts/${title}`,contents,(err)=>{
        const page = `
        <script>alert("작성되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    });
})

router.post("/process_update/:origin_title",(req,res)=>{
    const origin_title = req.params.origin_title;
    const revision_title = req.body.title;
    const contents = req.body.contents;
    fs.rename(`./posts/${origin_title}`,`./posts/${revision_title}`,(err)=>{
        if(err) throw err;
        fs.writeFile(`./posts/${revision_title}`,contents,(err)=>{
            const page = `
            <script>alert("수정되었습니다.")</script>
            <meta http-equiv="refresh" content="0; url=/posts/${revision_title}"></meta>
            `;
            res.send(page);
        });
    })
});

router.get("/create",(req,res)=> {
    res.render("post_create",{
        title:"Post 생성",
    });
})

router.get("/delete", (req,res)=>{
    const id = req.query.id;
    console.log(id);
    fs.unlink(`./posts/${id}`, (err)=>{
        if(err) throw err;
        const page = `
        <script>alert("삭제되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    });
});

router.get("/update", (req,res)=>{
    const id = req.query.id;
    fs.readFile(`./posts/${id}`, "utf8" , (err,data) =>{
        if(err) throw err;
        const contents_value = data;
        res.render("post_update",{
            title:"Post 수정",
            title_value:id,
            contents_value:contents_value,
        });
    });
});

router.get("/:postId",(req,res)=>{
    const postId = req.params.postId;
    fs.readFile(`./posts/${postId}`,"utf8",(err,data) =>{
        res.render("post",{
            title: postId,
            post_name: postId,
            contents: data,
            _delete: true,
            _update: true,
        })
    })
})


module.exports = router;