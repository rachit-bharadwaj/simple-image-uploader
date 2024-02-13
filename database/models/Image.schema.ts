import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Image ||
  mongoose.model("Image", ImageSchema, "images");
