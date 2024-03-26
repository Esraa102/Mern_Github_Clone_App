import express from "express";
import {
  getUserProfile,
  likeProfile,
  getLikes,
} from "../controllers/userControllers.js";
import { ensureAuthenticated } from "../middleware/checkUserAuth.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/like/:username", ensureAuthenticated, likeProfile);
router.get("/likes", ensureAuthenticated, getLikes);
export { router as userRoutes };
