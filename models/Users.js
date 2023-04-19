var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const axios = require("axios");
const Country = require("./Country");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,

    required: false,
  },
  email: {
    type: String,

    unique: true,

    required: false,
  },
  country: {
    type: String,

    required: false,
  },
  username: {
    type: String,

    unique: false,

    required: false,
  },
  token: {
    type: String,

    required: false,
  },
  providerId: {
    type: Number,

    required: false,
  },
  sex: {
    type: String,

    required: false,
  },
  password: {
    type: String,

    required: false,
  },
  photo: {
    type: String,

    required: false,
  },
  day: {
    type: Number,

    required: false,
  },
  month: {
    type: Number,

    required: false,
  },
  year: {
    type: Number,

    required: false,
  },
  height: {
    type: Number,

    required: false,
  },
  weight: {
    type: Number,

    required: false,
  },
  eyeColor: {
    type: Number,

    required: false,
  },

  hairColor: {
    type: Number,

    required: false,
  },
  tag: { type: Array, required: false },
  Items: [
    {
      nameItem: { type: String, required: false },
      category: { type: String, required: true },
      subCategory: { type: String, required: true },
      type: { type: Array, required: true },
      color: { type: String, required: false },
      url: { type: String, required: false },
      brand: { type: String, required: false },
      saison: { type: String, required: false },
      prix: { type: Number, required: false },
      dateAdded: { type: Date, required: true },
      fileName: { type: String, required: true },
    },
  ],
});

// hashing a password before saving it to the database

UserSchema.pre("save", function (next) {
  var user = this;
  // if (user.password !== "")
  bcrypt.hash(user.password, 10, async (err, hash) => {
    if (err) {
      return next(err);
    }

    await Country.findOne({ country: user.country }, async (error, country) => {
      if (country == null) {
        if (user.country !== undefined) {
          await axios
            .get(`https://restcountries.eu/rest/v2/name/${user.country}`)
            .then(async (res) => {
              console.log(res.latlng);
              console.log(res.data[0]);
              await Country.create({
                country: user.country,
                capital: res.data[0].capital,
                lan: res.data[0].latlng[0],
                long: res.data[0].latlng[1],
              });
            });
        }
      }
    });

    user.password = hash;

    next();
  });
});
//checks if the hashed password stored in the database matches the one sent.

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
var User = mongoose.model("User", UserSchema);

module.exports = User;

