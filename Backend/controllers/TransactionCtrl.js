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
};

module.exports = userTransaction;
