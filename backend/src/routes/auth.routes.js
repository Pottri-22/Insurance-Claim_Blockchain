import express from "express";
import { loginWithFirebase } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginWithFirebase);

export default router;
