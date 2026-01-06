import User from "../models/User.js";

/**
 * 👤 USER SIGNUP (Profile Creation)
 * Firebase user must already exist
 */


/**
 * 👤 USER: View own profile
 */
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

/**
 * 👤 USER: Update profile
 */
export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...updates,
        isFirstLogin: false, // 🔥 mark onboarding complete
      },
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

