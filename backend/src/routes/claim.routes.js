import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  submitClaim,
  getCompanyClaims,
  reviewClaim,
  getUserClaims,
} from "../controllers/claim.controller.js";

const router = express.Router();

/**
 * 🏥 Hospital submits claim
 */
router.post(
  "/submit",
  authenticate,
  authorizeRoles("hospital"),
  submitClaim
);

/**
 * 🏢 Insurance company views claims
 */
router.get(
  "/company",
  authenticate,
  authorizeRoles("insurance_company"),
  getCompanyClaims
);

/**
 * 🏢 Insurance company approves/rejects claim
 */
router.patch(
  "/review",
  authenticate,
  authorizeRoles("insurance_company"),
  reviewClaim
);

/**
 * 👤 User views own claims
 */
router.get(
  "/user",
  authenticate,
  authorizeRoles("user"),
  getUserClaims
);

export default router;
