import { Router } from "express";
import { addToCart, getCart, removeCartProduct } from "../controllers/cart.controller";
import authMiddleware from "../../../middlewares/auth.middleware";

const router = Router();

// Add product to cart
router.post("/", authMiddleware, addToCart);

// Get cart for a user
router.get("/:userId", authMiddleware, getCart);

// Remove product from cart
router.delete("/:userId/:productId", authMiddleware, removeCartProduct);

export default router;
