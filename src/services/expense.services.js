const mongoose = require("mongoose");
const ERROR_CODE = require("../constant/error-code");
const { ExpenseModel } = require("../models/expense.models");
const DEFAULT_LIMIT = 8;
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
  console.log("@@@totalExpenses", totalExpenses);
  const totalPages = Math.ceil(totalExpenses / limit);
  console.log("@@@totalPages", totalPages);
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

module.exports = {
  getAllExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
