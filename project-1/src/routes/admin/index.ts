import { Router } from "express";
import { requireAuth } from "#@/middlewares/auth.js";
import { requireRole } from "#@/middlewares/roles.js";
import { asyncHandler } from "#@/utils/async.js";
import { User } from "#@/modules/auth/model/index.js";

const admin = Router();

admin.get(
  "/stats",
  requireAuth,
  requireRole("admin"),
  asyncHandler(async (_req, res) => {
    const users = await User.countDocuments();
    const jobs = 0;
    const proposals = 0;

    res.json({ ok: true, stats: { users, jobs, proposals } });
  })
);

export default admin;
