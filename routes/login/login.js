const express = require("express");
const router = express.Router();
const mongoDB = require("../../custom_module/mongoDB");
const bkfd2Password  = require("pbkdf2-password");
const hasher = bkfd2Password();

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
    });
    const opts = {
        password : pwd,
    };
    hasher(opts, (err,pass,salt,hash)=>{
        newUser.salt = salt;
        newUser.pwd = hash;
        newUser.save().then(val =>{
            const page = `
            <script>alert("가입되었습니다.")</script>
            <meta http-equiv="refresh" content="0; url=/"></meta>
            `;
            res.send(page);
        });
    })
});

router.post("/signin",(req,res)=>{
    const account_name = req.body.account_name;
    const pwd = req.body.pwd;
    mongoDB.User.findOne({account_name:account_name},(err,user)=>{
        if(err) throw err;
        if(user === null){ // 아이디를 못찾았을 경우
            const page = `
            <script>alert("없는 아이디입니다.")</script>
            <meta http-equiv="refresh" content="0; url=/"></meta>
            `;
            res.send(page);
        }else{ // 아이디를 찾은 경우
            const opt ={
                password:pwd,
                salt:user.salt,
            }
            hasher(opt, (err,pass,salt,hash)=>{
                if(hash === user.pwd){ // 비밀번호가 올바른 경우
                    req.session.account_name = user.account_name;
                    req.session.save((err)=>{
                        if(err) throw err;
                        res.redirect("/");
                    });
                }else{
                    const page = `
                    <script>alert("비밀번호가 일치하지 않습니다.")</script>
                    <meta http-equiv="refresh" content="0; url=/"></meta>
                    `;
                    res.send(page);
                }
            });
        } 
    })
});

router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        const page = `
        <script>alert("로그아웃 되었습니다.")</script>
        <meta http-equiv="refresh" content="0; url=/"></meta>
        `;
        res.send(page);
    });
});

module.exports = router;