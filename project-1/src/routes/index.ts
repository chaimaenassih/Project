import { Router } from "express";
import authRoutes from "#@/routes/auth/index.js";
import adminRoutes from "#@/routes/admin/index.js";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/admin", adminRoutes);

export default router;
