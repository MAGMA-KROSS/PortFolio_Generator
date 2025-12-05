import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.middleware";
import { createOrder, getUserOrders, getDownloadLink } from "../controllers/order.controller";
 
const router = Router();

// Create a new order (fake payment for now)
router.post("/", authMiddleware, createOrder);

// Get all orders of the logged-in user
router.get("/", authMiddleware, getUserOrders);

// Download a product ZIP (one-time)
router.get("/download/:orderId/:productId", authMiddleware, getDownloadLink);

export default router;
