import User from "../models/User.js";
import Policy from "../models/Policy.js";

/**
 * 👤 USER: Enroll in a policy (new policy)
 */
export const enrollPolicy = async (req, res) => {
  try {
    const { policyId } = req.body;

    const policy = await Policy.findById(policyId);
    if (!policy || !policy.isActive) {
      return res.status(404).json({ message: "Policy not found or inactive" });
    }

    // Prevent duplicate enrollment
    const alreadyEnrolled = req.user.policies.some(
      (p) => p.policyId.toString() === policyId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Policy already enrolled" });
    }

    // Add policy to user
    req.user.policies.push({
      policyId,
      externalPolicy: false,
    });

    // Add user to policy
    policy.enrolledUsers.push({
      userId: req.user._id,
      externalPolicy: false,
    });

    await req.user.save();
    await policy.save();

    res.json({
      message: "Policy enrolled successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 👤 USER: Link existing policy (external)
 */
export const linkExternalPolicy = async (req, res) => {
  try {
    const { policyId, policyNumber, bondDocument } = req.body;

    const policy = await Policy.findById(policyId);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    req.user.policies.push({
      policyId,
      externalPolicy: true,
      policyNumber,
      bondDocument,
    });

    policy.enrolledUsers.push({
      userId: req.user._id,
      externalPolicy: true,
    });

    await req.user.save();
    await policy.save();

    res.json({
      message: "External policy linked successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 👤 USER: View enrolled policies
 */
export const getUserPolicies = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "policies.policyId"
  );

  res.json(user.policies);
};
