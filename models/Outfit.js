var mongoose = require("mongoose");

var OutfitSchema = new mongoose.Schema({
  nom: { type: String, require: false },
  tag: { type: String, require: false },

  Shoes: { type: mongoose.Types.ObjectId, required: false },
  Bags: { type: mongoose.Types.ObjectId, required: false },
  bottom: { type: mongoose.Types.ObjectId, required: false },
  topsOrOverTop: { type: mongoose.Types.ObjectId, required: false },
  dateAdded: { type: Date, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  isFavourite: { type: Boolean, required: false, default: false },
});

var Outfit = mongoose.model("Outfit", OutfitSchema);
module.exports = Outfit;
