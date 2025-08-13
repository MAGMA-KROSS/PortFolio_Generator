import { Router } from "express";
import { createCheckout } from "../controllers/checkout.controller";
import authMiddleware from "../../../middlewares/auth.middleware"; // use if user must be logged in

const router = Router();

// Only authenticated users can checkout
router.post("/", authMiddleware, createCheckout);

export default router;
