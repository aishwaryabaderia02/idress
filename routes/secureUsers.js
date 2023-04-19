var express = require("express");
var router = express.Router();
let secureUserController = require("../controller/secureUserController");
let ItemController = require("../controller/ItemController");
const passport = require('passport');
var multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../items");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".png");
    },
  });
  
  var upload = multer({ storage: storage });
console.log(upload)

router.get("/profile", secureUserController.GetUser);

router.put("/ChangeName", secureUserController.ChangeName);

router.put("/ChangePhoto",upload.single("file"), secureUserController.ChangePhoto);

router.put("/PersonalInfo", secureUserController.PersonalInfo);

router.put("/AddTag", secureUserController.AddTag);
module.exports = router;

