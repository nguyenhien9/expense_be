const mongoose = require("mongoose");
const ERROR_CODE = require("../constant/error-code");
const { IncomeModel } = require("../models/income.models");
const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 10;
const getAllIncome = async (filters) => {
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

  const income = await IncomeModel.find(query).skip(skip).limit(limit);

  return income;
};

const createIncome = async (dto) => {
  if (!dto.title) {
    throw new Error(ERROR_CODE.TITLE_REQUIRED.message);
  }
  if (!dto.amount) {
    throw new Error(ERROR_CODE.AMOUNT_REQUIRED.message);
  }
  if (!dto.desc) {
    throw new Error(ERROR_CODE.DESC_REQUIRED.message);
  }
  await IncomeModel.create({
    ...dto,
  });
  return dto;
};

const updateIncome = async (id, dto) => {
  await IncomeModel.findByIdAndUpdate(id, {
    $set: {
      ...dto,
    },
  });
};
const deleteIncome = async (id) => {
  await IncomeModel.findByIdAndDelete(id);
};
module.exports = {
  getAllIncome,
  createIncome,
  updateIncome,
  deleteIncome,
};
