import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User";
import { generateToken } from "../utils/auth";

export const register = async (req: Request, res: Response) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(409).json({ message: "Email is already in use" });
  }

  const existingUsername = await User.findOne({ username: req.body.username });

  if (existingUsername) {
    return res.status(409).json({ message: "Username is already in use" });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    const token = generateToken(user.id, user.email);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.username,
        email: user.email
      }
    });
  } catch (error) {
    if (
      error instanceof mongoose.Error &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({ message: "Username or email is already in use" });
    }

    throw error;
  }
};

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user.id, user.email);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.username,
      email: user.email
    }
  });
};
