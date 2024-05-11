const asyncHandler = require("express-async-handler");
const Transaction = require("../models/Transaction");

const userTransaction = {
  add: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!type || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Type, Amount and Date are required" });
    }
    const transaction = await Transaction.create({
      user: req.user,
      type,
      amount,
      category,
      date,
      description,
    });
    res.status(201).json(transaction);
  }),
  //lists
  lists: asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user });
    res.json(transactions);
  }),

  getFilterTransaction: asyncHandler(async (req, res) => {
    const { type, startDate, endDate, category } = req.query;
    let filter = { user: req.user };

    // Filtered by StartDate
    if (startDate) {
      filter.date = { ...filter.date, $gte: new Date(startDate) };
    }
    // Filtered by EndDate
    if (endDate) {
      filter.date = { ...filter.date, $lte: new Date(endDate) };
    }
    // Filtered by Type
    if (type) {
      filter.type = type;
    }
    if (category) {
      if (category === "All") {
        // no filter needed
      } else if (category === "Uncategorized") {
        filter.category = "Uncategorized";
      } else {
        filter.category = category;
      }
    }
    const transaction = await Transaction.find(filter).sort({ date: -1 });
    res.json(transaction);
  }),

  //Update Transaction
  updateTransaction: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      // Update transaction properties if they are provided in the request body
      if (req.body.category) transaction.category = req.body.category;
      if (req.body.type) transaction.type = req.body.type;
      if (req.body.amount) transaction.amount = req.body.amount;
      if (req.body.date) transaction.date = req.body.date;
      if (req.body.description) transaction.description = req.body.description;

      // Save the updated transaction
      const updatedTransaction = await transaction.save();
      // Send the updated transaction as the response
      res.json(updatedTransaction);
    } else {
      // Return a 404 Not Found response
      res.status(404).json({ error: "Transaction not found or unauthorized" });
    }
  }),
  // delete Transaction
  deleteTransaction: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction removed" });
    }
  }),
};

module.exports = userTransaction;
