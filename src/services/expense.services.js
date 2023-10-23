const mongoose = require("mongoose");
const ERROR_CODE = require("../constant/error-code");
const { ExpenseModel } = require("../models/expense.models");
const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 10;

const getAllExpense = async (filters) => {
  let skip = DEFAULT_SKIP;
  let limit = DEFAULT_LIMIT;
  if (filters.skip) {
    skip = filters.skip;
  }
  if (filters.limit) {
    limit = filters.limit;
  }
  const query = {};
  if (filters.title) {
    query.title = filters.title;
  }
  if (filters.amount) {
    query.amount = filters.amount;
  }

  const expenses = await ExpenseModel.find(query).skip(skip).limit(limit);
  return expenses;
};
const createExpense = async (dto) => {
  if (!dto.title) {
    throw new Error(ERROR_CODE.TITLE_REQUIRED.message);
  }
  if (!dto.amount) {
    throw new Error(ERROR_CODE.AMOUNT_REQUIRED.message);
  }
  if (!dto.desc) {
    throw new Error(ERROR_CODE.DESC_REQUIRED.message);
  }
  await ExpenseModel.create({ ...dto });
  return dto;
};
const updateExpense = async (id, dto) => {
  await ExpenseModel.findByIdAndUpdate(id, {
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
