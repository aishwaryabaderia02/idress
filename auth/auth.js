const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/Users');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,

    },
    async (req, email, password, done) => {
      try {
        console.log(req.body)
        const user = await User.create({
          email,
          password,
          name: req.body.name,
          username: req.body.username,
          country: req.body.country,
          sex: req.body.sex,
          photo: req.body.photo,
          tag: ["Daily", "Party", "Work", "Summer", "Winter"],
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        user.comparePassword(password, function (err, isMatch) {
          if (err) throw err;
          if (!isMatch) {
            return done(null, false, { message: 'Wrong Password' });
          }
          return done(null, user, { message: 'Logged in Successfully' });

        });




      } catch (error) {

        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
