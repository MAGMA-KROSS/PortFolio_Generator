import { Request, Response } from "express";
import { userSignupSchema, userLoginSchema } from "../validators/user.validation";
import User from "../../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate tokens
const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "15m" });
};

const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });
};

// ================== SIGNUP ==================
export const signup = async (req: Request, res: Response) => {
  console.log("🔥 Received signup request");
  console.log("Request body:", req.body);

  // Validate request body
  const parsedData = userSignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("❌ Validation failed:", parsedData.error.format());
    return res.status(400).json({ error: parsedData.error });
  }

  //@ts-ignore
  const { name, email, password, role } = parsedData.data;
  console.log("✅ Validation passed:", { name, email, role });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔒 Password hashed");

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    console.log("✅ New user created:", { id: newUser._id, email: newUser.email, role: newUser.role });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isAdmin: newUser.role === "admin",
      },
    });
  } catch (err) {
    console.error("💥 Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// ================== LOGIN ==================
export const login = async (req: Request, res: Response) => {
  const parsedData = userLoginSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ errors: parsedData.error.issues });
  }

  const { email, password } = parsedData.data;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken({ userId: user._id, name: user.name, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user._id });

  // Send refresh token as HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    message: "Login successful",
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === "admin", // tells frontend if user is admin
    },
  });
};

// ================== REFRESH TOKEN ==================
export const refresh = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }
///@ts-ignore
  jwt.verify(token, process.env.JWT_REFRESH_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const { userId, name } = decoded as any;
    const newAccessToken = generateAccessToken({ userId, name });

    res.json({ accessToken: newAccessToken });
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};