import Transaction from "../models/Transaction.js"

export const getTransactions = async (req, res) => {
  try {
    const { month } = req.query

    const filter = { user: req.user._id }

    if (month) {
      filter.date = { $regex: `^${month}` }
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 })

    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body

    if (!type || !amount || !category || !date) {
      return res.status(400).json({ message: "Please fill in all required fields" })
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      description,
      date,
    })

    res.status(201).json(transaction)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const editTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await transaction.deleteOne()

    res.status(200).json({ message: "Transaction deleted", id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}