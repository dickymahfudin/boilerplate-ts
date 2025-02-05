import { z } from "zod";

export const UserCreateSchema = z
  .object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/\d/),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must be the same",
    path: ["confirmPassword"],
  });

export type UserCreate = z.infer<typeof UserCreateSchema>;
