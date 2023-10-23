const incomeServices = require("../services/income.services");

const get = async (req, res, next) => {
  try {
    const filters = req.query;
    const result = await incomeServices.getAllIncome(filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await incomeServices.createIncome(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updateId = req.params.id;
    const data = req.body;
    await incomeServices.updateIncome(updateId, data);
    res.json({ message: "updated" });
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const deleteId = req.params.id;
    await incomeServices.deleteIncome(deleteId);
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
