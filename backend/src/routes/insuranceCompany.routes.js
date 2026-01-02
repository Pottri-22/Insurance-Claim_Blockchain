import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  registerInsuranceCompany,
  getAllInsuranceCompanies,
  getInsuranceCompanyProfile,
} from "../controllers/insuranceCompany.controller.js";

const router = express.Router();

/**
 * ADMIN ROUTES
 */
router.post(
  "/register",
  authenticate,
  authorizeRoles("admin"),
  registerInsuranceCompany
);

router.get(
  "/all",
  authenticate,
  authorizeRoles("admin"),
  getAllInsuranceCompanies
);

/**
 * INSURANCE COMPANY ROUTES
 */
router.get(
  "/profile",
  authenticate,
  authorizeRoles("insurance_company"),
  getInsuranceCompanyProfile
);

export default router;
