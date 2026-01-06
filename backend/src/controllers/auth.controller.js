import admin from "../config/firebase.js";
import User from "../models/User.js";

export const registerWithFirebase = async (req, res) => {
  try {
    const { idToken, role } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        firebaseUid: uid,
        email,
        role: role || "user",
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Registration successful",
      user: {
        uid: user.firebaseUid,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Registration failed" });
  }
};

export const loginWithFirebase = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID token missing" });
    }

    // 🔐 Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decoded;

    // 1️⃣ Try finding user by firebaseUid
    let user = await User.findOne({ firebaseUid: uid });

    // 2️⃣ If not found, try finding by email
    if (!user) {
      user = await User.findOne({ email });

      // 🔗 If email exists, link firebaseUid
      if (user) {
        user.firebaseUid = uid;
        await user.save();
      } else {
        // 3️⃣ Create brand new user
        user = await User.create({
          firebaseUid: uid,
          email,
          role: "user",
          isFirstLogin: true,
        });
      }
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        role: user.role,
        isFirstLogin: user.isFirstLogin,
      },
    });

  } catch (error) {
    console.error("Auth login error:", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};
