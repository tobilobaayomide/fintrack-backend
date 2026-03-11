import Budget from "../models/Budget.js"

export const getBudgets = async (req, res) => {
  try {
    const { month } = req.query

    const filter = { user: req.user._id }

    if (month) {
      filter.month = month
    }

    const budgets = await Budget.find(filter)

    res.status(200).json(budgets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const setBudget = async (req, res) => {
  try {
    const { category, month, limit } = req.body

    if (!category || !month || !limit) {
      return res.status(400).json({ message: "Please fill in all fields" })
    }

    const existing = await Budget.findOne({
      user: req.user._id,
      category,
      month,
    })

    if (existing) {
      existing.limit = limit
      await existing.save()
      return res.status(200).json(existing)
    }

    const budget = await Budget.create({
      user: req.user._id,
      category,
      month,
      limit,
    })

    res.status(201).json(budget)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id)

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" })
    }

    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const updated = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id)

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" })
    }

    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await budget.deleteOne()

    res.status(200).json({ message: "Budget deleted", id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}