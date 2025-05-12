const Transaction = require("../models/Transaction");

const getAllTransaction = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, amount, date } = req.query;
    const filter = { userId: req.userId };

    if (category) filter.category = category;
    if (amount) filter.amount = parseFloat(amount);
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await Transaction.countDocuments(filter);

    res.json({
      transactions,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const addNewTransaction = async (req, res) => {
  try {
    const { type, amount, category } = req.body;
    if (!type || !amount || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const transaction = new Transaction({
      userId: req.userId,
      type,
      amount,
      category,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, category } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { type, amount, category },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

module.exports = {
  getAllTransaction,
  addNewTransaction,
  updateTransaction,
  deleteTransaction,
};
