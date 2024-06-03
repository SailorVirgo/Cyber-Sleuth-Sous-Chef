const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models"); // Ensure this path is correct for your User model
const passport = require("passport");

// Configure the local strategy for Passport
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "No user found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user instance to session
passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  process.nextTick(() => {
    return cb(null, { id: user.id });
  });
});

// Deserialize user instance from session
passport.deserializeUser(async (user, cb) => {
  console.log("Deserializing user ID:", user.id);
  try {
    const foundUser = await User.findByPk(user.id);
    console.log("Found user:", foundUser);
    process.nextTick(() => {
      return cb(null, foundUser);
    });
  } catch (err) {
    console.error("Error deserializing user:", err);
    return cb(err);
  }
});

module.exports = passport;
