import { Request, Response } from "express"
import User from "../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { registerSchema } from "../utils/validation"

export const register = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map(e => ({
          field: e.path[0],
          message: e.message
        }))
      })
    }

    const { name, email, password } = result.data

    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      message: "User created",
      user
    })
  } catch (err: any) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const checkPassword = await bcrypt.compare(password, user.password as string)

    if (!checkPassword) {
      return res.status(400).json({ message: "Wrong password" })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    res.json({
      message: "Login success",
      token: token
    })
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      message: "Error in login"
    })
  }
}

export { }