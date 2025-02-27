const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userSchema");

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? process.env.GOOGLE_CALLBACK_URL_PROD
          : process.env.GOOGLE_CALLBACK_URL_LOCAL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google OAuth strategy called"); 
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            role: "user",
          });
          await user.save();
        }
        //console.log("User authenticated:", user);  Debug log
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
