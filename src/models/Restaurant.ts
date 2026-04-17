import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },
  images: [String]
}, { timestamps: true });

RestaurantSchema.index({ location: "2dsphere" });

export default mongoose.model("Restaurant", RestaurantSchema);
