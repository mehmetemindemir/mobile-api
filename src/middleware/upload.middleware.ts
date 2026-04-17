import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
      return;
    }

    cb(null, true);
  }
});
