import admin from "../config/firebase.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
