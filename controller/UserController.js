let User = require("../models/Users");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const controller = {
  Register: (req, res, next) => {
    console.log('i am hit')
    try {
      const body = { _id: req.user._id, email: req.user.email };
      const token = jwt.sign({ user: body }, "TOP_SECRET");
      res.json({
        message: "Signup successful",
        user: req.user,
        token: token,
      });
    } catch (e) {
      console.log(e);
    }
  },
  RegisterWithFb: async (req, res, next) => {
    try {
      const user = await User.create({
        email: req.body.email,

        name: req.body.name,
        username: req.body.username,
        // country: req.body.country,
        // sex: req.body.sex,
        password: req.body.providerId,
        photo: req.body.photo,
        providerId: req.body.providerId,
        token: req.body.token,
        tag: ['Daily', 'Party', 'Work', 'Summer', 'Winter'],
      });
      //  res.json({ message: "Signup successful", user, token: req.body.token });
      //console.log(req.body)
      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, "TOP_SECRET");
      res.json({ message: "Signup successful", user: user, token });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "error", err: e });
    }
  },
  // PersonalInfo: (req, res, next) => {
  //   res.send("Personal Info added succefully ! ");

  // try {
  //   User.findOneAndUpdate(
  //     { username: req.body.username },
  //     {
  //       $set: {
  //         PersonalInfo: [req.body.personalInfo],
  //       },
  //     },
  //     {
  //       upsert: true,
  //     }
  //   ).then((result) => {
  //     res.send("Personal Info added succefully ! ");
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
  // },
  Login: async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("An error occurred.");
          console.log(err, user);

          return res.json({ message: info.message });
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          if (user) {
            const body = { _id: user._id, email: user.email };

            const token = jwt.sign({ user: body }, "TOP_SECRET");

            return res.json({ token, user: user, message: info.message });
          } else {
            return res.json({ message: info.message });
          }
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
};
module.exports = controller;
