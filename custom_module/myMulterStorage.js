const multer = require("multer");
const path = require("path");

const myMulterStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/post_images');
    },
    filename: function (req, file, cb) {
        if(req.post === undefined){ //create의 경우
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extention = path.extname(file.originalname);
            const filename_image = file.fieldname + '-' + uniqueSuffix+extention;
            cb(null, filename_image);
        }else{ // update의 경우
            const revision_account_name = req.body.account_name;
            const contents = req.body.ontents;
            req.post_changed = {
                account_name:revision_account_name,
                contents:contents,
                time:new Date(),
            };c
            if(req.post.filename_image === ""){ // 이전에 이미지를 저장하지 않은경우
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                const extention = path.extname(file.originalname);
                const filename_image = file.fieldname + '-' + uniqueSuffix+extention;
                cb(null, filename_image);
                req.post_changed.filename_image = filename_image;
            }else{ // 이전에 이미지를 저장한 경우 (이미지 업데이트)
                cb(null, req.post.filename_image);
            }
        }
    }
  });

  module.exports = myMulterStorage;
  

