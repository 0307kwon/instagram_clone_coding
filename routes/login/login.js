const express = require("express");
const router = express.Router();
const mongoDB = require("../../custom_module/mongoDB");

router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.post("/signup/process",(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const account_name = req.body.account_name;
    const pwd = req.body.pwd;
    const newUser = new mongoDB.User({
        email:email,
        name:name,
        account_name:account_name,
        pwd:pwd,
    });
    newUser.save().then(val =>{
        const page = `
        <script>alert("가입되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    });
});

router.post("/signin",(req,res)=>{
    const account_name = req.body.account_name;
    const pwd = req.body.pwd;
    mongoDB.User.findOne({account_name:account_name},(err,user)=>{
        if(err) throw err;
        if(user.pwd === pwd){
            res.redirect("/posts/list");
        }else{
            res.send("로그인 실패");
        }
    })
});

module.exports = router;