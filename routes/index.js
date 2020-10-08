const { file } = require('babel-types');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const { title } = require('process');
const post_db = require('../custom_module/post_db.js');

class PostTemplete{
  constructor(title,filename_image,contents,link){
    this.title = title;
    this.contents = contents;
    this.filename_image = filename_image
    this.link = link;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let contents_list = '';


  const templete_posts = [];
  post_db.Post.find({},(err,posts)=>{
    if(err) throw err;
    for(let i=0; i<posts.length; i++){
      const title = posts[i].title;
      const filename_image = posts[i].filename_image;
      const contents = posts[i].contents;
      const link =posts[i]._id;
      templete_posts.push(new PostTemplete(title,filename_image,contents,link));
    }
    res.render('index', { 
      title: 'Kwonstagram',
      posts:templete_posts,
      _create: true,
    });
  });
});

module.exports = router;

