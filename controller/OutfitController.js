const Outfit = require("../models/Outfit");
let User = require("../models/Users");

const controller = {
  AddOutfit: async (req, res, next) => {
    try {
      let outfit = req.body.outfit;
      let user = await User.findOne({ _id: req.query._id });
      outfit.userId = user.id;
      outfit.dateAdded = new Date();
      Outfit.create(outfit);
      res.status(200).json(outfit);
    } catch (e) {
      console.log(e);
      res.status(408).json("erreur create outfit");
    }
  },

  GetOutfits: async (req, res, next) => {
    try {
      let user = await User.findOne({ _id: req.query._id });
      let outfits = await Outfit.find({ userId: user.id });
      let items = user["Items"];
      let outfitsList = [];
      outfits.forEach((item, index) => {
        let bottom = items.find((savedItem) => savedItem.id == item.bottom);
        let Bags = items.find((savedItem) => savedItem.id == item.Bags);
        let Shoes = items.find((savedItem) => savedItem.id == item.Shoes);
        let topsOrOverTop = items.find(
          (savedItem) => savedItem.id == item.topsOrOverTop
        );
        const isFavourite = item.isFavourite != null ? item.isFavourite : false;
	const tag = item.tag != null ? item.tag : '';

        let newOutfit = {
          id: item._id,
          nom: item.nom != null ? item.nom : "nom",
	  tag,
          bottom,
          Bags,
          Shoes,
          topsOrOverTop,
          userId: user,
          dateAdded: item.dateAdded,
          isFavourite,
        };
        outfitsList.push(newOutfit);
      });
      res.status(200).json(outfitsList);
    } catch (e) {
      console.log(e);
    }
  },

  setOutfitFavourite: async (req, res, next) => {
    try {
      const { idOutfit, newValue } = req.query;
      const val =
        newValue === "true" ? true : newValue === "false" ? false : newValue;
      if (typeof val === "boolean") {
        Outfit.findByIdAndUpdate(
          { _id: idOutfit },
          { isFavourite: val },
          function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
          }
        );
      } else {
        res.status(400).send("Invalid boolean");
      }
    } catch (e) {
      console.log(e);
    }
  },

  deleteOutfit: async (req, res, next) => {
    try {
      const { idOutfit } = req.query;
      Outfit.findOneAndDelete({ _id: idOutfit }, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
      });
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = controller;

