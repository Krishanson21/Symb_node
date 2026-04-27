import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters")
})

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),

    password: z.string().min(1, "Password is required")
})

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),

    description: z.string().optional(),

    status: z.enum(["todo", "in-progress", "done"]).optional(),

    priority: z.enum(["low", "medium", "high"]).optional(),
})