var mongoose = require("mongoose");

var CountrySchema = new mongoose.Schema({
  country: {
    type: String,

    required: false,
  },
  lan: {
    type: String,

    required: false,
  },
  long: {
    type: String,

    required: false,
  },
  weather: {
    type: String,

    required: false,
  },
});

var Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
