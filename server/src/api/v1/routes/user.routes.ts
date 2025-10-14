
import {Router} from "express"; 
import { signup,login} from "../controllers/auth.controller";
import express from "express";
import authMiddleware from "../../../middlewares/auth.middleware";
import { getMyProfile } from "../controllers/user.controller";
import { updateProfile } from "../controllers/user.controller";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateProfile);

export default router;