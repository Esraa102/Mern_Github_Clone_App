import express from "express";
import { userRoutes } from "./routes/userRoutes.js";
import "./passport/githubAuth.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { exploreRouter } from "./routes/exploreRoutes.js";
import { connectToDB } from "./config/connectDB.js";
import { authRouter } from "./routes/authRoutes.js";
import passport from "passport";
import session from "express-session";
import path from "path";

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve("../");

console.log(__dirname);
connectToDB();

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.listen(port, () => {
  console.log(`Server Running On http://localhost:${port}`);
});
