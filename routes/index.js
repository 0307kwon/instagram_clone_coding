const { file } = require('babel-types');
var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  let contents_list = '';
  fs.readdir("./posts", (err,files) =>{
    if(err) throw err;
    for(let i=0; i<files.length; i++){
      contents_list += `<li><a href="/posts/${files[i]}">${files[i]}</a></li>`;
    }

    res.render('index', { 
      title: 'Express',
      contents_list: contents_list,
      _create: true,
    });
  })
 
});

module.exports = router;
