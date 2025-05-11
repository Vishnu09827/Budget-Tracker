const express = require("express");
const authenticate = require("../middleware/auth");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.get("/", authenticate, transactionController.getAllTransaction);

router.post("/", authenticate, transactionController.addNewTransaction);

module.exports = router;
