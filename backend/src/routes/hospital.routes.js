import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  registerHospital,
  getAllHospitals,
  getHospitalProfile,
} from "../controllers/hospital.controller.js";

const router = express.Router();

/**
 * ADMIN ROUTES
 */
router.post(
  "/register",
  authenticate,
  authorizeRoles("admin"),
  registerHospital
);

router.get(
  "/all",
  authenticate,
  authorizeRoles("admin"),
  getAllHospitals
);

/**
 * HOSPITAL ROUTES
 */
router.get(
  "/profile",
  authenticate,
  authorizeRoles("hospital"),
  getHospitalProfile
);

export default router;
