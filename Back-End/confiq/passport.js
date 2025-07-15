const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const keys = require("./keys");
const User = require("../model/user.model");

const { google, facebook } = keys;

// const User = mongoose.model("User");
const secret = keys.jwt.secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

module.exports = async (app) => {
  app.use(passport.initialize());

  await GoogleAuth();
  await FacebookAuth();
};

const GoogleAuth = async () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: google.clientID,
          clientSecret: google.clientSecret,
          callbackURL:`${process.env.SERVER_URL}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if the user already exists
            const user = await User.findOrCreateSocialUser(profile, 'google');
            return done(null, user);
           
          } catch (err) {
            return done(err, false);
          }
        }
      )
    );
  } catch (error) {
    console.log("Missing google keys:", error.message);
  }
};

const FacebookAuth = async () => {
  try {
    passport.use(
      new FacebookStrategy(
        {
          clientID: facebook.clientID,
          clientSecret: facebook.clientSecret,
          callbackURL:`${process.env.SERVER_URL}/api/auth/facebook/callback`,
          profileFields: [
            "id",
            "displayName",
            "name",
            "emails",
            "picture.type(large)",
          ],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if the user already exists
            const user = await User.findOrCreateSocialUser(profile, 'facebook');
            return done(null, user);

          
          } catch (err) {
            return done(err, false);
          }
        }
      )
    );
  } catch (error) {
    console.log("Missing facebook keys");
  }
};

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-refreshTokens');
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

