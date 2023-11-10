const mongoose = require("mongoose");

const { ExpenseModel } = require("../models/expense.model");
const DEFAULT_LIMIT = 4;
require("dotenv").config();

const getAllExpense = async (filters) => {
  const sortField = filters.sort;
  let limit = DEFAULT_LIMIT;
  let page = parseInt(filters.page) || 1;
  const sortOptions = {};
  switch (sortField) {
    case "Latest":
      sortOptions.date = -1;
      break;
    case "Oldest":
      sortOptions.date = 1;
      break;
    case "Largest":
      sortOptions.amount = -1;
      break;
    case "Smallest":
      sortOptions.amount = 1;
      break;
    default:
      sortOptions.date = 1;
  }

  const query = {};
  if (filters.title) {
    query.$text = { $search: filters.title };
  }

  if (filters.type && filters.type !== "All") {
    query.type = filters.type;
  }

  const totalExpenses = await ExpenseModel.countDocuments();

  const totalPages = Math.ceil(totalExpenses / limit);

  const expenses = await ExpenseModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort(sortOptions);

  return { page, per_page: limit, totalExpenses, totalPages, expenses };
};
const createExpense = async (dto) => {
  // if (!dto.title) {
  //   throw new Error(ERROR_CODE.TITLE_REQUIRED.message);
  // }
  // if (!dto.amount) {
  //   throw new Error(ERROR_CODE.AMOUNT_REQUIRED.message);
  // }
  // if (!dto.desc) {
  //   throw new Error(ERROR_CODE.DESC_REQUIRED.message);
  // }
  // if (!dto.type) {
  //   throw new Error(ERROR_CODE.TYPE_REQUIRED.message);
  // }
  return await ExpenseModel.create({ ...dto });
};
const updateExpense = async (id, dto) => {
  return await ExpenseModel.findByIdAndUpdate(id, {
    $set: {
      ...dto,
    },
  });
};

const deleteExpense = async (id) => {
  await ExpenseModel.findByIdAndDelete(id);
};

const showReport = async (filters) => {
  const dateFilters = {};

  if (filters.startDate) {
    dateFilters.startDate = new Date(filters.startDate);
  }
  if (filters.endDate) {
    dateFilters.endDate = new Date(filters.endDate);
  }

  const expenses = await ExpenseModel.find({
    date: {
      $gte: dateFilters.startDate,
      $lte: dateFilters.endDate,
    },
  }).sort({ date: 1 });

  let expenseAmount = 0;
  let incomeAmount = 0;

  const totalExpense = await ExpenseModel.aggregate([
    {
      $match: {
        type: "Expense",
        date: {
          $gte: dateFilters.startDate,
          $lte: dateFilters.endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        amount: { $sum: "$amount" },
      },
    },
  ]);

  if (totalExpense.length > 0) {
    expenseAmount = totalExpense[0].amount;
  }
  const totalIncome = await ExpenseModel.aggregate([
    {
      $match: {
        type: "Income",
        date: {
          $gte: dateFilters.startDate,
          $lte: dateFilters.endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        amount: { $sum: "$amount" },
      },
    },
  ]);

  if (totalIncome.length > 0) {
    incomeAmount = totalIncome[0].amount;
  }

  return {
    totalExpense: expenseAmount,
    totalIncome: incomeAmount,
    expenses,
  };
};

module.exports = {
  getAllExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  showReport,
};
