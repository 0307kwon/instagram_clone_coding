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
    res.render('index');
});

module.exports = router;

