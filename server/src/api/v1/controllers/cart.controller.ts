import { Request, Response } from "express";
import mongoose from "mongoose";
import Cart from "../../../models/cart.model";

// ================= ADD TO CART =================
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, price, image } = req.body;

    if (!userId || !productId || !price || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if product already exists
      const existingProductIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (existingProductIndex > -1) {
        // Increase quantity if product exists
        cart.products[existingProductIndex].quantity += quantity || 1;
      } else {
        // Add new product
        cart.products.push({
            //@ts-ignore
          productId: new mongoose.Types.ObjectId(productId),
          quantity: quantity || 1,
          price,
          image,
        });
      }

      // Recalculate totals
      cart.totalQuantity = cart.products.reduce((sum, p) => sum + p.quantity, 0);
      cart.totalPrice = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

      await cart.save();
    } else {
      // Create new cart
      cart = await Cart.create({
        userId: new mongoose.Types.ObjectId(userId),
        products: [
          {
            productId: new mongoose.Types.ObjectId(productId),
            quantity: quantity || 1,
            price,
            image,
          },
        ],
        totalQuantity: quantity || 1,
        totalPrice: price * (quantity || 1),
      });
    }

    return res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= GET CART =================
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= REMOVE PRODUCT FROM CART =================
export const removeCartProduct = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    // Recalculate totals
    cart.totalQuantity = cart.products.reduce((sum, p) => sum + p.quantity, 0);
    cart.totalPrice = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    await cart.save();

    return res.status(200).json({ message: "Product removed", cart });
  } catch (error) {
    console.error("Error in removeCartProduct:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
