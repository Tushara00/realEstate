import { z } from "zod";

export const signupSchema = z.object({
   name: z.string().min(2).max(50).optional(),
  email: z.email().transform((val) => val.trim().toLowerCase()),
  password: z.string().min(6).max(100),
})
 export const loginSchema = z.object({
  email: z.email().transform((val) => val.trim().toLowerCase()),
  password: z.string().min(6).max(100),
});