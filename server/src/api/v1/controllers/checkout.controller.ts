import { Request, Response } from "express";
import Cart from "../../../models/cart.model";
import Order from "../../../models/order.model";
import User from "../../../models/user.model";
import mongoose from "mongoose";

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId; // ideally from auth middleware

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate("products.productid");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Prepare products data for the order
    const productsForOrder = cart.products.map((item) => ({
        //@ts-ignore
      productId: item.productid._id,
      //@ts-ignore
      title: item.productid.title, // make sure your Project model has a title
      //@ts-ignore
      description: item.productid.description || "",
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    // Create order
    const newOrder = await Order.create({
      userId: cart.userId,
      userName: user.name,
      userEmail: user.email,
      products: productsForOrder,
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
      paymentStatus: "pending",
    });

    return res.status(201).json({
      message: "Checkout successful, order created",
      order: newOrder,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
