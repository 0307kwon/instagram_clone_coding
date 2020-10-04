const { file } = require('babel-types');
var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  let contents_list = '';

  if(req.query.alert === "post_make"){
    contents_list+= `<script>alert("작성되었습니다")</script>`;
  }


  fs.readdir("./posts", (err,files) =>{
    if(err) throw err;
    for(let i=0; i<files.length; i++){
      contents_list += `<li><a href="/posts/${files[i]}">${files[i]}</a></li>`;
    }

    res.render('index', { 
      title: 'Kwonstagram',
      contents_list: contents_list,
      _create: true,
    });
  })
 
});

module.exports = router;
