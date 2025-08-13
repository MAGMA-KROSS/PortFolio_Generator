import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";

const router = Router();

// Auth Routes

// Login
router.post("/login", (req, res) => {
  res.send("Login endpoint");
});

// Signup
router.post("/signup", (req, res) => {
  res.send("Signup endpoint");
});

// Refresh token
router.post("/refresh", (req, res) => {
  res.send("Refresh token endpoint");
});
// We'll add these next
// router.post("/refresh", refreshToken);
// router.post("/logout", logout);

export default router;
