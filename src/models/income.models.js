const mongoose = require("mongoose");
const incomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      maxLength: 20,
    },
    amount: {
      type: Number,
      require: true,
      min: 0,
    },
    type: {
      type: String,
      default: "Income",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    desc: {
      type: String,
      require: true,
      maxLength: 50,
    },
  },
  {
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

const incomeModel = mongoose.model("Income", incomeSchema);

module.exports = {
  IncomeModel: incomeModel,
};
