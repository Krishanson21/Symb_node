import { Request, Response } from "express"
import Task from "../models/task.model"

export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, status, priority, dueDate } = req.body

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id
    })

    res.status(201).json(task)
  } catch (err: any) {
    res.status(500).json({ message: "Error creating task" })
  }
}

export const getTasks = async (req: any, res: Response) => {
  try {
    let tasks

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("user", "email role")
    } else {
      tasks = await Task.find({ user: req.user.id })
    }

    res.json(tasks)
  } catch (err: any) {
    res.status(500).json({ message: "Error fetching tasks" })
  }
}

export const getTaskById = async (req: any, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json(task)
  } catch (err: any) {
    res.status(500).json({ message: "Error getting task" })
  }
}

export const updateTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      req.body,
      { new: true }
    )

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json(task)
  } catch (err: any) {
    res.status(500).json({ message: "Error updating task" })
  }
}

export const deleteTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json({ message: "Task deleted" })
  } catch (err: any) {
    res.status(500).json({ message: "Error deleting task" })
  }
}

export const getTaskAnalytics = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user.id })

    const stats = {
      total: tasks.length,
      status: {
        todo: tasks.filter(t => t.status === "todo").length,
        inProgress: tasks.filter(t => t.status === "in-progress").length,
        done: tasks.filter(t => t.status === "done").length
      },
      priority: {
        low: tasks.filter(t => t.priority === "low").length,
        medium: tasks.filter(t => t.priority === "medium").length,
        high: tasks.filter(t => t.priority === "high").length
      },
      productivity: {
        completed: tasks.filter(t => t.status === "done").length,
        pending: tasks.filter(t => t.status !== "done").length
      }
    }

    res.json(stats)
  } catch (err) {
    res.status(500).json({ message: "Error getting analytics" })
  }
}
export{}