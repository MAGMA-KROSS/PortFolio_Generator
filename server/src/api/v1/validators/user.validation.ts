import { z } from "zod";

// ================== SIGNUP SCHEMA ==================
export const userSignupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(/^[A-Za-z\s]{3,50}$/, "Name must contain only letters and spaces"),

  email: z
    .string()
    .min(3)
    .max(50)
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email pattern"
    ),

  password: z
    .string()
    .min(6)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,30}$/,
      "Password must include at least one uppercase, one lowercase, and one number"
    ),

  role: z.enum(["admin", "user"]).optional(), // optional role for admin support
});

// ================== LOGIN SCHEMA ==================
export const userLoginSchema = z.object({
  email: z
    .string()
    .min(3)
    .max(50)
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email pattern"
    ),

  password: z
    .string()
    .min(6)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,30}$/,
      "Password must include at least one uppercase, one lowercase, and one number"
    ),
});
