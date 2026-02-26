import mongoose, { Schema, model } from "mongoose";

const uploadSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    sessionId: {
      type: String,
      index: true,
    },
    url: {
      type: String,
      required: true,
    },
    publicId: String,
    fileSize: {
      type: Number,
      min: 0,
    },
    mimeType: String,
    isUsed: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

export default model("Upload", uploadSchema);