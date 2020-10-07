const express = require("express");
const router = express.Router();

//라우터 미들웨어
const Create =  require("./create");
const Update = require("./update");
const Delete = require("./delete");
const View = require("./view");
//

router.use("/create", Create);

router.use("/view",View);

router.use("/update",Update);

router.use("/delete",Delete);

module.exports = router;

