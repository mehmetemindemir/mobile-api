import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  } satisfies SignOptions);
};
