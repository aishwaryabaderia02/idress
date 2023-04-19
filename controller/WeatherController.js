let Country = require("../models/Country");
let User = require("../models/Users");

const controller = {
  findCountryWeather: async(req, res, next) => {
  console.log(req.query._id)
await  User.findOne({ _id: req.query._id }).then(async(user, er) => {
    await  Country.findOne({ country: user.country }).then((result, er1) => {
        console.log(result, 'aaaaaaaaaaaaaaaa');
        console.log(user.country, 'bbbbbbbb');
        result != null
          ? res.status(200).json(result)
          : res.status(404).json("Not Found");
      });
    });
  },
};

module.exports = controller;

