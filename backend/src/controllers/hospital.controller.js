import Hospital from "../models/Hospital.js";
import User from "../models/User.js";

/**
 * ADMIN: Register Hospital
 */
export const registerHospital = async (req, res) => {
  try {
    const { name, email, walletAddress } = req.body;

    // Check if hospital already exists
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({ message: "Hospital already exists" });
    }

    // Create hospital
    const hospital = await Hospital.create({
      name,
      email,
      walletAddress,
      createdBy: req.user.firebaseUid,
    });

    // If user already exists, update role
    const user = await User.findOne({ email });
    if (user) {
      user.role = "hospital";
      await user.save();
    }

    res.status(201).json({
      message: "Hospital registered successfully",
      hospital,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Get All Hospitals
 */
export const getAllHospitals = async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
};

/**
 * HOSPITAL: View Own Profile
 */
export const getHospitalProfile = async (req, res) => {
  const hospital = await Hospital.findOne({ email: req.user.email });

  if (!hospital) {
    return res.status(404).json({ message: "Hospital not found" });
  }

  res.json(hospital);
};
