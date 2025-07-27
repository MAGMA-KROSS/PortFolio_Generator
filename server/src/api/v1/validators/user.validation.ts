import { z } from 'zod';

export const userSignupSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .nonempty()
    .regex(/^[A-Za-z\s]{3,50}$/, "Name must contain only letters and spaces"),

  password: z
    .string()
    .min(6)
    .max(30)
    .nonempty()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,30}$/,
      "Password must include at least one uppercase, one lowercase, and one number"
    ),

  email: z
    .string()
    .min(3)
    .max(50)
    .nonempty()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email pattern"
    ),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .min(3)
    .max(50)
    .nonempty()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email pattern"
    ),
    password: z
    .string()
    .min(6)
    .max(30)
    .nonempty()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,30}$/,
      "Password must include at least one uppercase, one lowercase, and one number"
    ),
})
