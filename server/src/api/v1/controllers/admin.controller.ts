import { Request, Response } from "express";
import User from "../../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --- Admin login ---
export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Admin login attempt:", { email, password });

  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { userId: admin._id, role: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: admin._id, role: "admin" },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Server error during admin login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- Admin dashboard ---
export const adminDashboard = (req: Request, res: Response) => {
  res.json({ message: "Welcome Admin!", user: (req as any).user });
};

// --- Get all users ---
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "", sort = "createdAt_desc" } = req.query;

    const query = search ? { name: { $regex: search.toString(), $options: "i" } } : {};

    let sortObj: any = {};
    if (typeof sort === "string") {
      const [field, order] = sort.split("_");
      sortObj[field] = order === "asc" ? 1 : -1;
    }

    const users = await User.find(query)
      .sort(sortObj)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await User.countDocuments(query);

    res.json({ results: users, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- Get single user ---
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- Delete user ---
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---
