import "dotenv/config";
import { z } from "zod";

export const env = {
  NODE_ENV: z.enum(["development", "production", "test"]).default("development").parse(process.env.NODE_ENV),
  PORT: z.coerce.number().default(3000).parse(process.env.PORT),
  DATABASE_URL: z.string().default("").parse(process.env.DATABASE_URL),
};
