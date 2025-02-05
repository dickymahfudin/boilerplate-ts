import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export type IUser = z.infer<typeof UserSchema> & Document;

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
