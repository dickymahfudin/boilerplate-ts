import { z } from "zod";
import mongoose, { Schema, Document } from "mongoose";

export const AddressSchema = z.object({
  userId: z.string(),
  name: z.string(),
  address: z.string(),
});

export type IAddress = z.infer<typeof AddressSchema> & Document;

const addressSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
});

export const AddressModel = mongoose.model<IAddress>("Address", addressSchema);
