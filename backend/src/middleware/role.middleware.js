import User from "../models/User.js";

export const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { uid } = req.firebaseUser;

      const user = await User.findOne({ firebaseUid: uid });

      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user; // attach DB user
      next();
    } catch (error) {
      console.error("RBAC error:", error.message);
      return res.status(500).json({ message: "Authorization failed" });
    }
  };
};
