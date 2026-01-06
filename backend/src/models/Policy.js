import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InsuranceCompany",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    coverageAmount: {
      type: Number,
      required: true,
    },
    premiumAmount: {
      type: Number,
      required: true,
    },
    validDays: {
      type: Number,
      required: true,
    },
    terms: {
      type: String,
    },
    enrolledUsers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
        externalPolicy: {
          type: Boolean,
          default: false,
        },
      },
    ],


    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Policy", policySchema);
