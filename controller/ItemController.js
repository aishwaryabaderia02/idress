const Outfit = require("../models/Outfit");
const { db } = require("../models/Users");
let User = require("../models/Users");
const fs = require("fs");

const controller = {
  GetUserItems: (req, res, next) => {
    try {
      User.findOne({
        _id: req.query._id,
      }).then((result) => {
        console.log(result["Items"]);
        result != null
          ? res.status(200).json(result["Items"])
          : res.status(404).json("Not Found");
      });
    } catch (e) {
      console.log(e);
    }
  },

  GetItem: (req, res, next) => {
    try {
      User.findOne({
        "Items._id": req.query._id,
      }).then((result) => {
        console.log(result);
        result != null
          ? res.status(200).json(result)
          : res.status(404).json("Not Found");
      });
    } catch (e) {
      console.log(e);
    }
  },

  AddItem: (req, res, next) => {
    try {
      let item = JSON.parse(req.body.item);
      item = { ...item, fileName: req.file.filename };
      User.findOneAndUpdate(
        { _id: req.query._id },
        {
          $push: {
            Items: item,
          },
        },
        {
          upsert: true,
        }
      ).then((result) => {
        res.status(200).json("Item Added");
      });
    } catch (e) {
      console.log(e);
    }
  },

  GetUserLastItems: (req, res, next) => {
    try {
      User.findOne({
        _id: req.query._id,
      }).then((result) => {
        let unsortedItems = result["Items"];
        const items = unsortedItems
          .slice()
          .sort((a, b) => b.dateAdded - a.dateAdded);
        result != null
          ? res.status(200).json(items.slice(0, 4))
          : res.status(404).json("Not Found");
      });
    } catch (e) {
      console.log(e);
    }
  },

  UpdateItemPhoto: (req, res, next) => {
    try {
      let item = JSON.parse(req.body.item);
      fs.unlinkSync("items/" + item.fileName);
      const newFileName = req.file.filename;
      User.findOneAndUpdate(
        { _id: req.query._id },
        {
          $set: {
            "Items.$[el].url": item.url,
            "Items.$[el].fileName": newFileName,
            "Items.$[el].color": item.color,
          },
        },
        {
          arrayFilters: [{ "el._id": item._id }],
          new: true,
        }
      ).then((result) => {
        res.status(200).json(newFileName);
      });
    } catch (e) {
      console.log(e);
    }
  },

  UpdateItem: (req, res, next) => {
    try {
      let item = req.body.item;
      User.findOneAndUpdate(
        { _id: req.query._id },
        {
          $set: {
            "Items.$[el]": item,
          },
        },
        {
          arrayFilters: [{ "el._id": item._id }],
          new: true,
        }
      ).then((result) => {
        res.status(200).json("Updated");
      });
    } catch (e) {
      console.log(e);
    }
  },

  DeleteItem: async (req, res, next) => {
    let item = req.body.item;
    fs.unlinkSync("items/" + item.fileName);
    let _id = req.query._id;
    try {
      const searchQuery = [
        { top: item._id },
        { accessories: item._id },
        { bottom: item._id },
        { overtop: item._id },
      ];
      await User.findOneAndUpdate(
        { _id: _id },
        {
          $pull: {
            Items: { _id: item._id },
          },
        }
      );
      Outfit.deleteMany({ $or: searchQuery }).then((value) => {
        res.json(value);
      });
    } catch (e) {
      console.log(e);
    }
  },

  updateItemCategory: async (req, res, next) => {
    try {
      const {
        params: { idUser, idItem },
        body: { category, subCategory },
      } = req;
      User.findOneAndUpdate(
        { _id: idUser },
        {
          $set: {
            "Items.$[el].category": category,
            "Items.$[el].subCategory": subCategory,
          },
        },
        {
          arrayFilters: [{ "el._id": idItem }],
          new: true,
        }
      ).then(async () => {
        let outfits = await Outfit.find({ userId: idUser });
        outfits.forEach(async (element) => {
          if (element.Shoes == idItem) {
            element.Shoes = null;
            await element.save();
          }
          if (element.Bags == idItem) {
            element.Bags = null;
            await element.save();
          }
          if (element.bottom == idItem) {
            element.bottom = null;
            await element.save();
          }
          if (element.topsOrOverTop == idItem) {
            element.topsOrOverTop = null;
            await element.save();
          }
        });
        res.json("Done");
      });
    } catch (e) {
      console.log(e);
    }
  },

  changeItemTags: async (req, res, next) => {
    try {
      const {
        params: { idUser, idItem },
        body: { tags },
      } = req;
      User.findOneAndUpdate(
        { _id: idUser },
        {
          $set: {
            "Items.$[el].type": tags,
          },
        },
        {
          arrayFilters: [{ "el._id": idItem }],
          new: true,
        }
      ).then(() => {
        res.json("Done");
      });
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = controller;
