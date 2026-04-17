import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<UserDocument>("User", UserSchema);
