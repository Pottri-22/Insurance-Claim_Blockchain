import Claim from "../models/Claim.js";
import User from "../models/User.js";
import Hospital from "../models/Hospital.js";
import InsuranceCompany from "../models/InsuranceCompany.js";
import Policy from "../models/Policy.js";

/**
 * 🏥 HOSPITAL: Submit Claim
 */
export const submitClaim = async (req, res) => {
  try {
    const { userId, policyId, claimedAmount, documents } = req.body;

    // Find hospital
    const hospital = await Hospital.findOne({ email: req.user.email });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find policy
    const policy = await Policy.findById(policyId).populate("companyId");
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    // Create claim
    const claim = await Claim.create({
      userId: user._id,
      hospitalId: hospital._id,
      companyId: policy.companyId._id,
      policyId: policy._id,
      claimedAmount,
      documents,
      status: "submitted",
    });

    res.status(201).json({
      message: "Claim submitted successfully",
      claim,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🏢 INSURANCE COMPANY: View Claims
 */
export const getCompanyClaims = async (req, res) => {
  try {
    const company = await InsuranceCompany.findOne({ email: req.user.email });
    if (!company) {
      return res.status(404).json({ message: "Insurance company not found" });
    }

    const claims = await Claim.find({ companyId: company._id })
      .populate("userId", "email")
      .populate("hospitalId", "name")
      .populate("policyId", "name coverageAmount");

    res.json(claims);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🏢 INSURANCE COMPANY: Approve or Reject Claim
 */
export const reviewClaim = async (req, res) => {
  try {
    const { claimId, decision } = req.body;

    if (!["approved", "rejected"].includes(decision)) {
      return res.status(400).json({ message: "Invalid decision" });
    }

    const claim = await Claim.findById(claimId);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    // Update status
    claim.status = decision;
    await claim.save();

    // 🔗 BLOCKCHAIN HOOK (placeholder)
    if (decision === "approved") {
      // Later: trigger smart contract here
      claim.blockchainTxHash = "BLOCKCHAIN_TX_PLACEHOLDER";
      claim.status = "paid";
      await claim.save();
    }

    res.json({
      message: `Claim ${decision} successfully`,
      claim,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 👤 USER: View Own Claims
 */
export const getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.user._id })
      .populate("hospitalId", "name")
      .populate("policyId", "name")
      .populate("companyId", "name");

    res.json(claims);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
