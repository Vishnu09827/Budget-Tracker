const express = require("express");
const authenticate = require("../middleware/auth");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

router.get("/", authenticate, budgetController.getBudgetByUserId);

router.post("/", authenticate, budgetController.setNewBudget);

module.exports = router;
