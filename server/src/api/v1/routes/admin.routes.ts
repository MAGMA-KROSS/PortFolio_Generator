import express from "express";
import authMiddleware from "../../../middlewares/auth.middleware";
import { checkRole } from "../../../middlewares/role.middleware";
import {
  adminLogin,
  adminDashboard,
  getUsers,
  getUserById,
  deleteUser,
} from "../controllers/admin.controller";

const router = express.Router();

// --- Admin login route ---
router.post("/login", adminLogin);

// --- Admin dashboard ---
router.get("/dashboard", authMiddleware, checkRole(["admin"]), adminDashboard);

// --- User management ---
router.get("/users", authMiddleware, getUsers);
router.get("/users/:id", authMiddleware, getUserById);
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;
