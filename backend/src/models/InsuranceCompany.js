import mongoose from "mongoose";

const insuranceCompanySchema = new mongoose.Schema(
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
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String, // admin firebase UID
    },
  },
  { timestamps: true }
);

export default mongoose.model("InsuranceCompany", insuranceCompanySchema);
