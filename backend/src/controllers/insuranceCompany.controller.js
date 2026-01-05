import InsuranceCompany from "../models/InsuranceCompany.js";
import User from "../models/User.js";

/**
 * ADMIN: Register Insurance Company
 */
export const registerInsuranceCompany = async (req, res) => {
  try {
    const { name, email, walletAddress } = req.body;

    const exists = await InsuranceCompany.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Insurance company already exists" });
    }

    const company = await InsuranceCompany.create({
      name,
      email,
      walletAddress,
      createdBy: req.user.firebaseUid,
    });

    // Promote user role if exists
    const user = await User.findOne({ email });
    if (user) {
      user.role = "insurance_company";
      await user.save();
    }

    res.status(201).json({
      message: "Insurance company registered",
      company,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Get all companies
 */
export const getAllInsuranceCompanies = async (req, res) => {
  const companies = await InsuranceCompany.find();
  res.json(companies);
};

/**
 * INSURANCE COMPANY: View profile
 */
export const getInsuranceCompanyProfile = async (req, res) => {
  const company = await InsuranceCompany.findOne({ email: req.user.email });

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  res.json(company);
};
