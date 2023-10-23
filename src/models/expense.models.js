const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 20,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      default: "Expense",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 50,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const expenseModel = mongoose.model("Expense", expenseSchema);

module.exports = {
  ExpenseModel: expenseModel,
};
