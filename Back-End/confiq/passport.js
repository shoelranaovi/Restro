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

// const googleAuth = async () => {
//   try {
//     passport.use(
//       new GoogleStrategy(
//         {
//           clientID: google.clientID,
//           clientSecret: google.clientSecret,
//           callbackURL: google.callbackURL,
//         },
//         (accessToken, refreshToken, profile, done) => {
//           User.findOne({ email: profile.email })
//             .then((user) => {
//               if (user) {
//                 return done(null, user);
//               }

//               const name = profile.displayName.split(" ");

//               const newUser = new User({
//                 provider: "Google",
//                 googleId: profile.id,
//                 email: profile.email,
//                 firstName: name[0],
//                 lastName: name[1],
//                 profilePicture: profile.picture,
//                 password: "null",
//               });

//               newUser.save((err, user) => {
//                 if (err) {
//                   return done(err, false);
//                 }

//                 return done(null, user);
//               });
//             })
//             .catch((err) => {
//               return done(err, false);
//             });
//         }
//       )
//     );
//   } catch (error) {
//     console.log("Missing google keys");
//   }
// };
const GoogleAuth = async () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: google.clientID,
          clientSecret: google.clientSecret,
          callbackURL: google.callbackURL,
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
          callbackURL: facebook.callbackURL,
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

