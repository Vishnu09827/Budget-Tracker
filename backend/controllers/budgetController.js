const Budget = require("../models/Budget");

const getBudgetByUserId = async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.userId });
    res.json(budget || { amount: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch budget" });
  }
};

const setNewBudget = async (req, res) => {
  try {
    const { amount } = req.body;
    let budget = await Budget.findOne({ userId: req.userId });
    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = new Budget({
        userId: req.userId,
        amount,
      });
      await budget.save();
    }
    res.status(201).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to set budget" });
  }
};

module.exports = { getBudgetByUserId, setNewBudget };
