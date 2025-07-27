import { Request, Response } from "express";
import { userSignupSchema } from "../validators/user.validation";
import User from "../../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const signup = async (req: Request, res: Response) => {
  const parsedData = userSignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      error: parsedData.error 
    });
  }

  const existingUser = await User.findOne({ email: parsedData.data.email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

  const newUser = await User.create({
    name: parsedData.data.name,
    email: parsedData.data.email,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "User registered successfully",
    userId: newUser._id,
  });
};

export { signup };


const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { name: user.name },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" } // ✅ This line must end with `}`, not `;`
  );

  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

export { login };


export const getMyProfile = async (req: Request, res: Response) => {
  try {
     //@ts-ignore
    const user = await User.findById(req.user._id)
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
    // CHANGE THIS LINE ONLY:
    //@ts-ignore
    const userId = req.user._id; // ✅ From token (was `req.params.id`)

    const { name, email, password } = req.body;

    let updateData: Partial<{ name: string; email: string; password: string }> = { name, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, // ✅ Now uses secure ID
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Keep this as-is (it's fine)
    const { password: _, __v: __, ...rest } = updatedUser.toObject();
    const safeData: SafeUser = rest;
    res.json(safeData);

  } catch (err) {
    res.status(500).json({ error: "Failed to update user profile" });
  }
};