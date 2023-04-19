var express = require("express");
var multer = require("multer");
var router = express.Router();
let UserController = require("../controller/UserController");
let ItemController = require("../controller/ItemController");
let OutfitController = require("../controller/OutfitController");
const passport = require("passport");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "items");
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

router.put("/AddItem", upload.single("file"), ItemController.AddItem);
router.get("/GetUserItems", ItemController.GetUserItems);
router.get("/GetUserLastItems", ItemController.GetUserLastItems);
router.put("/UpdateItem", ItemController.UpdateItem);
router.put(
  "/UpdateItemPhoto",
  upload.single("file"),
  ItemController.UpdateItemPhoto
);
// router.put("/PersonalInfo", UserController.PersonalInfo);
router.get("/UserItem", ItemController.GetItem);
router.put("/AddOutfit", OutfitController.AddOutfit);
router.get("/GetOutfits", OutfitController.GetOutfits);
router.put("/DeleteItem", ItemController.DeleteItem);
router.put("/favouriteOutfit", OutfitController.setOutfitFavourite);
router.delete("/DeleteOutfit", OutfitController.deleteOutfit);
router.put(
  "/UpdateItemCategory/:idUser/:idItem",
  ItemController.updateItemCategory
);
router.put("/ChangeItemTags/:idUser/:idItem", ItemController.changeItemTags);

module.exports = router;
