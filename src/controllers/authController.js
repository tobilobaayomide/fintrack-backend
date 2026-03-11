import jwt from "jsonwebtoken"
import User from "../models/User.js"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" })
    }

    const user = await User.create({ name, email, password })

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" })
    }

    const user = await User.findOne({ email })

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}