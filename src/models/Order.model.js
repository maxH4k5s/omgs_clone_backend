import mongoose, { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    variant: { type: Schema.Types.ObjectId, ref: "ProductVariant" },

    productName: { type: String, required: true },
    size: String,
    thickness: String,

    uploadedPhotos: [String],
    previewImage: String,

    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },

    customizationData: Schema.Types.Mixed,
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    items: [orderItemSchema],

    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    subtotal: { type: Number, required: true, min: 0 },
    shippingCharge: { type: Number, default: 0, min: 0 },
    discountAmount: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },

    paymentMethod: {
      type: String,
      enum: ["upi", "card", "netbanking", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },
    paymentId: String,
    paymentGatewayResponse: Schema.Types.Mixed,

    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "processing",
        "printed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "placed",
      index: true,
    },
    trackingNumber: String,
    courier: String,

    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
    notes: String,
  },
  { timestamps: true }
);

export default model("Order", orderSchema);