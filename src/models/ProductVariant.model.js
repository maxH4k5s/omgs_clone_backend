import mongoose, { Schema, model } from "mongoose";

const productVariantSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    sizeLabel: {
      type: String,
      trim: true,
    },
    thickness: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountedPrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      default: 999,
      min: 0,
    },
    itemsLeft: {
      type: Number,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate size + thickness for same product
productVariantSchema.index(
  { product: 1, size: 1, thickness: 1 },
  { unique: true }
);

export default model("ProductVariant", productVariantSchema);