import { Request, Response } from "express"
import User from "../models/user.model"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" })
    }
}
export const getProfile = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile" })
    }
}

export const updateProfile = async (req: any, res: Response) => {
    try {
        // console.log(req.body)

        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (req.body.name) user.name = req.body.name
        if (req.body.email) user.email = req.body.email

        await user.save()

        res.json(user)
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}
export const updateUserRole = async (req: any, res: Response) => {
  try {
    const { role } = req.body

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" })
    }

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.role = role
    await user.save()

    res.json(user)
  } catch (err: any) {
    console.log(err)
    res.status(500).json({ message: "something wrong happened" })
  }
}

export { }