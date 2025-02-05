import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export type IUser = z.infer<typeof UserSchema>;
