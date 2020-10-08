const { file } = require('babel-types');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const post_db = require('../custom_module/post_db.js');

class PostTemplete{
  constructor(account_name,filename_image,contents,link){
    this.account_name = account_name;
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
      const account_name = posts[i].account_name;
      const filename_image = posts[i].filename_image;
      const contents = posts[i].contents;
      const link = `/posts/view/${posts[i]._id}`;
      templete_posts.push(new PostTemplete(account_name,filename_image,contents,link));
    }
    res.render('index', { 
      title: 'Kwonstagram',
      posts:templete_posts,
      _create: true,
    });
  });
});

module.exports = router;

