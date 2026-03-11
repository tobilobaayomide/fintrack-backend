import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./src/config/db.js"
import authRoutes from "./src/routes/authRoutes.js"
import transactionRoutes from "./src/routes/transactionRoutes.js"
import budgetRoutes from "./src/routes/budgetRoutes.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",          
    "https://fintrack26.vercel.app",    
  ],
  credentials: true,
}))

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "FinTrack API is running 🚀" })
})

app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/budgets", budgetRoutes)

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))