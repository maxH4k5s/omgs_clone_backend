import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const addressSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"]
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true
    },
    addressLine2: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Invalid pincode"]
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { _id: true }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false   // prevent accidental exposure
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"]
    },
    avatar: {
      type: String,
      trim: true
    },
    addresses: [addressSchema],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    refreshToken: {
      type: String,
      select: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      sub: this._id,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      sub: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}



export default mongoose.model("User", userSchema);