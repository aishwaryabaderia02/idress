let User = require("../models/Users");

const controller = {
  GetUser: (req, res, next) => {
    try {
      User.findOne({
        _id: req.user._id,
      }).then((thisUser) => {
        res.json({
          message: "Secure Response",
          user: thisUser,
          token: req.query.secret_token,
        });
      });
    } catch (e) {
      console.log(e);
    }
  },
  ChangeName: (req, res, next) => {
    try {
      console.log(req.body.name);
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            name: req.body.name,
          },
        },
        {
          upsert: true,
        }
      ).then((result) => {
        res.json({
          message: "Secure Response",
          result: result,
          token: req.query.secret_token,
        });
      });
    } catch (e) {
      console.log(e);
    }
  },
  ChangePhoto: (req, res, next) => {
        console.log(req.file.filename);

	try {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            photo: req.file.filename,
          },
        },
        {
          upsert: true,
        }
      ).then(async (result) => {
//        console.logs(err, result)
res.json({
          message: "Secure Response",
          result: req.file.filename,
          token: req.query.secret_token,
        });
      });
    } catch (e) {
      console.log(e);
    }
  },
  PersonalInfo: (req, res, next) => {
	
    res.send("Personal Info added succefully ! ");
	
    try {
      User.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            day: req.body.day,
	    month: req.body.month,
	    year: req.body.year,	
            height: req.body.height,
            weight: req.body.weight,
            hairColor: req.body.hair,
            eyeColor: req.body.eye,
	    country: req.body.country,	
          },
        },
        {
          upsert: true,
        }
      ).then((result) => {
        res.send("Personal Info added succefully ! ");
      });
    } catch (e) {
      console.log(e);
    }
  },
  AddTag: (req, res, next) => {
    try {
        console.log(req.body.name)
      User.findOneAndUpdate(
        { _id : req.query._id
        },
        {
          $set: {
            tag: req.body.tag,
          },
        },
        {
          upsert: true,
        }
      ).then((result) => {
        res.json({
            message: 'Secure Response',
            result: result,
            token: req.query.secret_token
          })
      });
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = controller;

