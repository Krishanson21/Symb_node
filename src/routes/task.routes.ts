import express from "express"
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/task.controller"
import { protect } from "../middleware/auth.middleware"

const router = express.Router()

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title,description,status,priority,date]
 *             properties:
 *                title: { type: string, example: Task name }
 *                description: { type: string, example: Task description }
 *                status: { type: string, example: todo | in-progress | done }
 *                priority: { type: string, example: low | medium | high }
 *                date: { type: date, example: 2026-04-14 }
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", protect, createTask)

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", protect, getTasks)

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 */
router.get("/:id", protect, getTaskById)

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title,description,status,priority,date]
 *             properties:
 *                title: { type: string, example: Task name }
 *                description: { type: string, example: Task description }
 *                status: { type: string, example: todo | in-progress | done }
 *                priority: { type: string, example: low | medium | high }
 *                date: { type: date, example: 2026-04-14 }
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/:id", protect, updateTask)

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", protect, deleteTask)

export default router