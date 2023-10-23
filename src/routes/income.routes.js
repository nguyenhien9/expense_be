const express = require("express");
const router = express.Router();
const incomeControllers = require("../controllers/income.controllers");

router.get("/income", incomeControllers.get);
router.post("/income", incomeControllers.create);
router.put("/income/:id", incomeControllers.update);
router.delete("/income/:id", incomeControllers.remove);
module.exports = router;
