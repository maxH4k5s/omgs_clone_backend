import mongoose, { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variant: {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },
    uploadedPhotos: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    customizationData: {
      photoPositions: [Schema.Types.Mixed],
      previewImage: String,
    },
    priceAtAdd: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
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
    items: [cartItemSchema],
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export default model("Cart", cartSchema);