import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "InsuranceCompany" },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: "Policy" },

  documents: [String], // file URLs
  claimedAmount: Number,

  status: {
    type: String,
    enum: ["submitted", "under_review", "approved", "rejected", "paid"],
    default: "submitted",
  },

  blockchainTxHash: String,
}, { timestamps: true }
);

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;
