import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";
import insuranceCompanyRoutes from "./routes/insuranceCompany.routes.js";
import policyRoutes from "./routes/policy.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/insurance-companies", insuranceCompanyRoutes);
app.use("/api/policies", policyRoutes);


export default app;
