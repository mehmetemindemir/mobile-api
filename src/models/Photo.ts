import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  restaurantId: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Photo", PhotoSchema);
