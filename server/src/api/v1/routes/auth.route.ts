import { Router } from "express";
import { signup, login ,refresh, logout} from "../controllers/auth.controller";

const router = Router();

// Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
export default router;
