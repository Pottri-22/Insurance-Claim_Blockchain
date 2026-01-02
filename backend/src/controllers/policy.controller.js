import Policy from "../models/Policy.js";
import InsuranceCompany from "../models/InsuranceCompany.js";

/**
 * INSURANCE COMPANY: Create Policy
 */
export const createPolicy = async (req, res) => {
  try {
    const company = await InsuranceCompany.findOne({
      email: req.user.email,
    });

    if (!company) {
      return res.status(404).json({ message: "Insurance company not found" });
    }

    const policy = await Policy.create({
      companyId: company._id,
      ...req.body,
    });

    res.status(201).json({
      message: "Policy created successfully",
      policy,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * INSURANCE COMPANY: View own policies
 */
export const getCompanyPolicies = async (req, res) => {
  const company = await InsuranceCompany.findOne({ email: req.user.email });
  const policies = await Policy.find({ companyId: company._id });
  res.json(policies);
};

/**
 * USER: View all active policies
 */
export const getAllPolicies = async (req, res) => {
  const policies = await Policy.find({ isActive: true }).populate(
    "companyId",
    "name"
  );
  res.json(policies);
};
