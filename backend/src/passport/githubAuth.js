import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/userModel.js";
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ username: profile.username });

      //sign up
      if (!user) {
        const newUser = new User({
          username: profile.username,
          name: profile.displayName,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos[0].value,
          likedProfiles: [],
          likedBy: [],
        });
        await newUser.save();
        done(null, newUser);
      } else {
        //login
        done(null, user);
      }
    }
  )
);
