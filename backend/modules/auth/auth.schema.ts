import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1).email("Please enter a valid email address"),
  password: z.string().min(6),
});

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1).email("Please enter a valid email address"),
  password: z.string().min(6),
  repassword: z.string().nullish(),
  phoneNumber: z.string(),
});

export { loginSchema, registerSchema };
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
