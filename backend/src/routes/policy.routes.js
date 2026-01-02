import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  createPolicy,
  getCompanyPolicies,
  getAllPolicies,
} from "../controllers/policy.controller.js";

const router = express.Router();

/**
 * INSURANCE COMPANY ROUTES
 */
router.post(
  "/create",
  authenticate,
  authorizeRoles("insurance_company"),
  createPolicy
);

router.get(
  "/company",
  authenticate,
  authorizeRoles("insurance_company"),
  getCompanyPolicies
);

/**
 * USER ROUTES
 */
router.get(
  "/all",
  authenticate,
  authorizeRoles("user", "hospital"),
  getAllPolicies
);

export default router;
