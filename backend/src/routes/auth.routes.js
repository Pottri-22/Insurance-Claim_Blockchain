import express from "express";
import { loginWithFirebase, registerWithFirebase } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerWithFirebase);
router.post("/login", loginWithFirebase);

export default router;
