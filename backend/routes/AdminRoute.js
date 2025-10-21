import express from "express";
import { createAdmin, loginAdmin, logoutAdmin } from "../controllers/AdminControllers.js";

const router = express.Router();

router.post("/admin/register", createAdmin);
router.post("/admin/login", loginAdmin);
router.delete("/admin/logout", logoutAdmin);

export default router;
