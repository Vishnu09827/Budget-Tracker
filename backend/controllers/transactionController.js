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

module.exports = { getAllTransaction, addNewTransaction };
