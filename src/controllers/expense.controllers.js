const expenseServices = require("../services/expense.services");

const get = async (req, res, next) => {
  try {
    const filters = req.query;
    const result = await expenseServices.getAllExpense(filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await expenseServices.createExpense(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updateId = req.params.id;
    const data = req.body;
    await expenseServices.updateExpense(updateId, data);
    res.json({ message: "updated" });
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const deleteId = req.params.id;
    await expenseServices.deleteExpense(deleteId);
    res.json({ message: "deleted" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get,
  create,
  update,
  remove,
};
