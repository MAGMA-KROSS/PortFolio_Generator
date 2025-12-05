import { Request, Response } from "express"; 
import User from "../../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// 1. The Big Picture 🌍
// When a user signs up, the backend needs to:

// Check if the data is valid (name, email, password)

// Check if the user already exists

// Securely store the password (hashing)

// Save the user in the database

// Send a success/error response




export const getMyProfile = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = await User.findById(req.user._id) //ok so it also checks the user existnce and if it exists then returns the data also?
      .select('-password -__v -refreshToken');

    // 2. Validate user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 3. Send only safe, up-to-date fields
    res.json({
      id: user._id,       // ✅ From DB (not token)
      name: user.name,    // ✅ Always current
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
}


interface SafeUser {
  _id: mongoose.Types.ObjectId; // Use Mongoose's ObjectId type
  name: string;
  email: string;
  role?: string;      // Optional fields
  createdAt?: Date;
  // Add other non-sensitive fields from your schema
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // ✅ Make sure req.user exists before accessing _id
    //@ts-ignore
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not found in token" });
    }

    const { name, email, password } = req.body;

    let updateData: Partial<{ name: string; email: string; password: string }> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _, __v: __, ...rest } = updatedUser.toObject();
    const safeData: SafeUser = rest;
    res.json(safeData);

  } catch (err: any) {
    console.error(err); // log full error
    res.status(500).json({ error: err.message || "Failed to update user profile" });
  }
};
