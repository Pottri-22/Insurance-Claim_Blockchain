import admin from "../config/firebase.js";
import User from "../models/User.js";

export const loginWithFirebase = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        $setOnInsert: {
          firebaseUid: uid,
          email,
          role: "user",
        },
      },
      {
        new: true,
        upsert: true, // 🔥 creates if not exists
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        uid: user.firebaseUid,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
