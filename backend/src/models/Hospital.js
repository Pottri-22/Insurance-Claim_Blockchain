import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String, // admin firebase UID
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
