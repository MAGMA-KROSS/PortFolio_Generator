import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../../../models/order.model";
import { IProductInOrder } from "../../../models/order.model";
import { Project } from "../../../models/project.model";
import User from "../../../models/user.model";
 import cloudinary from "cloudinary";


// Utility to safely extract user info from JWT
function getUserFromRequest(req: Request) {
  // Type assertion to tell TS what `req.user` contains
  //@ts-ignore
  const user = req.user as { _id?: string; name?: string; email?: string } | undefined;
  if (!user || !user._id || !user.name || !user.email) return null;
  return { _id: user._id, name: user.name, email: user.email };
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    // Get user ID from auth middleware
    //@ts-ignore
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // Fetch full user info from DB to get email & name
    
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { productId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const project = await Project.findById(productId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Build product object for order
    const productInOrder: IProductInOrder = {
      productId: project._id,
      title: project.title,
      description: project.description,
      quantity: 1,
      price: project.price,
      image: project.imageUrl,
      zipUrl: project.zipUrl,
      isDownloaded: false,
    };

    const newOrder = await Order.create({
      userId: user._id,
      userName: user.name,
      userEmail: user.email, // now comes from DB
      products: [productInOrder],
      totalQuantity: 1,
      totalPrice: project.price,
      paymentStatus: "success",
      paymentMethod: "fake",
    });

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};



// ===== GET TEMPORARY DOWNLOAD LINK =====
export const getDownloadLink = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    console.log("User from request:", user);
    
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { orderId, productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid ID(s)" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Use user._id for comparison (from your debug output)
    if (!order.userId.equals(user._id)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Find product in order
    // @ts-ignore
    const product = order.products.find(p => p.productId.equals(productId));
    if (!product) return res.status(404).json({ error: "Product not in this order" });

    if (product.isDownloaded) return res.status(403).json({ error: "Product already downloaded" });

    // Generate temporary signed URL using Cloudinary
    const signedUrl = cloudinary.v2.utils.private_download_url(
      product.zipUrl, 
      "zip", 
      {
        expires_at: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
        attachment: true,
      }
    );

    // Update product download info
    product.downloadLink = signedUrl;
    product.downloadExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    product.isDownloaded = true;

    await order.save();

    res.json({ downloadLink: signedUrl });
  } catch (err) {
    console.error("Download link error:", err);
    res.status(500).json({ error: "Failed to generate download link" });
  }
};
// ===== GET USER ORDERS =====
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });

    // Only show safe info
    // @ts-ignore
    const safeOrders = orders.map(order => ({
      id: order._id,
      totalQuantity: order.totalQuantity,
      totalPrice: order.totalPrice,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      // @ts-ignore
      products: order.products.map(p => ({
        productId: p.productId,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
        image: p.image,
        isDownloaded: p.isDownloaded,
      })),
    }));

    res.json({ orders: safeOrders });
  } catch (err) {
    console.error("Get user orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
