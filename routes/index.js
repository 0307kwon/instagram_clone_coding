const { file } = require('babel-types');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const mongoDB = require('../custom_module/mongoDB.js');

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
    if(req.session.account_name === undefined){
        res.render('index');
    }else{
        let contents_list = '';
        const templete_posts = [];
        mongoDB.Post.find({},(err,posts)=>{
            if(err) throw err;
            for(let i=0; i<posts.length; i++){
            const account_name = posts[i].account_name;
            const filename_image = posts[i].filename_image;
            const contents = posts[i].contents;
            const link = `/posts/view/${posts[i]._id}`;
            templete_posts.push(new PostTemplete(account_name,filename_image,contents,link));
            }
            res.render('post_list', { 
            title: 'Kwonstagram',
            posts:templete_posts,
            _create: true,
        });
  });
    }
    
});

module.exports = router;

