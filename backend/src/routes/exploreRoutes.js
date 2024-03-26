import express from "express";
import { getReposByLanguage } from "../controllers/exploreControllers.js";
import { ensureAuthenticated } from "../middleware/checkUserAuth.js";
export const exploreRouter = express.Router();

exploreRouter.get("/repos/:language", ensureAuthenticated, getReposByLanguage);
