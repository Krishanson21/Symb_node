import express from "express"
import { protect } from "../middleware/auth.middleware"
import { isAdmin } from "../middleware/role.middleware"
import { getAllUsers, getProfile, updateProfile, updateUserRole } from "../controllers/user.controller"

const router = express.Router()

router.get("/", protect, isAdmin, getAllUsers)
router.get("/profile", protect, getProfile)
router.put("/profile", protect, updateProfile)
router.put("/role/:id", protect, isAdmin, updateUserRole)

export default router