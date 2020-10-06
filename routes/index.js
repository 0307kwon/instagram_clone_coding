const { file } = require('babel-types');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const post_db = require('./post_db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let contents_list = '';

  post_db.Post.find({},(err,posts)=>{
    if(err) throw err;
    for(let i=0; i<posts.length; i++){
      const title = posts[i].title;
      const id =posts[i]._id;
      contents_list += `<li><a href="/posts/${id}">${title}</a></li>`;
    }
    res.render('index', { 
      title: 'Kwonstagram',
      contents_list:contents_list,
      _create: true,
    });
  });
});

module.exports = router;

