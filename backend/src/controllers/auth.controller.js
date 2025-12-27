import admin from "../config/firebase.js";
import User from "../models/User.js";

export const loginWithFirebase = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email,
        role: "user",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        uid,
        email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
