import express from "express"
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(protect)

router.get("/", getTransactions)
router.post("/", addTransaction)
router.put("/:id", editTransaction)
router.delete("/:id", deleteTransaction)

export default router