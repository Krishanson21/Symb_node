import express from "express"
import { protect } from "../middleware/auth.middleware"
import { getTaskAnalytics } from "../controllers/task.controller"

const router = express.Router()

router.get("/tasks", protect, getTaskAnalytics)

export default router

export{}