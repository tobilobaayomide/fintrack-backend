import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["housing", "food", "transportation", "utilities", "savings", "miscellaneous"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction