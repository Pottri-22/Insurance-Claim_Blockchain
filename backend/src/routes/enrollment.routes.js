import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  enrollPolicy,
  linkExternalPolicy,
  getUserPolicies,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

/**
 * 👤 User enrolls in policy
 */
router.post(
  "/enroll",
  authenticate,
  authorizeRoles("user"),
  enrollPolicy
);

/**
 * 👤 User links existing policy
 */
router.post(
  "/link",
  authenticate,
  authorizeRoles("user"),
  linkExternalPolicy
);

/**
 * 👤 User views enrolled policies
 */
router.get(
  "/my-policies",
  authenticate,
  authorizeRoles("user"),
  getUserPolicies
);

export default router;
