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
    linkedHospitals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    }],

    policies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
    }],

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
