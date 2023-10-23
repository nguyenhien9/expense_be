const express = require("express");
const expenseController = require("../controllers/expense.controllers");
const router = express.Router();

router.get("/expense", expenseController.get);
router.post("/expense", expenseController.create);
router.put("/expense/:id", expenseController.update);
router.delete("/expense/:id", expenseController.remove);

module.exports = router;
