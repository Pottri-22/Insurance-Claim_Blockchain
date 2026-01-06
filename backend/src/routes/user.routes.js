import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * 👤 Get user profile
 */
router.get(
  "/profile",
  authenticate,
  authorizeRoles("user"),
  getUserProfile
);

/**
 * 👤 Update user profile
 */
router.put(
  "/profile",
  authenticate,
  authorizeRoles("user"),
  updateUserProfile
);

export default router;
