const express = require("express");
const authenticate = require("../middleware/auth");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.get("/", authenticate, transactionController.getAllTransaction);

router.post("/", authenticate, transactionController.addNewTransaction);

router.put("/:id", authenticate, transactionController.updateTransaction);

router.delete("/:id", authenticate, transactionController.deleteTransaction);

module.exports = router;
