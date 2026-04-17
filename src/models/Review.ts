import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  restaurantId: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Review", ReviewSchema);
