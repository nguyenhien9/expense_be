const express = require("express");
const expenseController = require("../controllers/expense.controller");
const router = express.Router();
const modelValidate = require("../middlewares/validateExpense.middleware");

router.get("/expense", expenseController.get);
router.post("/expense", modelValidate, expenseController.create);
router.put("/expense/:id", modelValidate, expenseController.update);
router.delete("/expense/:id", expenseController.remove);
router.get("/expense/report", expenseController.showReport);
module.exports = router;
