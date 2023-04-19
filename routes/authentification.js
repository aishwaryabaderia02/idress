var express = require("express");
var multer = require("multer");
var router = express.Router();
let UserController = require("../controller/UserController");
const passport = require("passport");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../items");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

var upload = multer({ storage: storage });
router.post(
  "/register",
  passport.authenticate("signup", { session: false }),
  UserController.Register
);

router.post("/resgisterFb", UserController.RegisterWithFb);

// router.put("/PersonalInfo", UserController.PersonalInfo);

// router.get("/UserItem", ItemController.GetItem);
router.post("/login", UserController.Login);
module.exports = router;
