import express from "express"
import { protect } from "../middleware/auth.middleware"
import { getTaskAnalytics } from "../controllers/task.controller"

const router = express.Router()

/**
 * @swagger
 * /analytics/tasks:
 *   get:
 *     summary: Get task analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task analytics
 */
router.get("/tasks", protect, getTaskAnalytics)

export default router

export { }