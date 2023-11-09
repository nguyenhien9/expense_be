const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["Expense", "Income"],
        message: "{VALUE} is not supported",
      },
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
).index({ title: "text" });

const expenseModel = mongoose.model("Expense", expenseSchema);

module.exports = {
  ExpenseModel: expenseModel,
};
