const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../controllers/TransactionCtrl");
const isAuthenticated = require("../middlewares/isAuthentication");

transactionRouter.post(
  "/api/v1/transaction/add",
  isAuthenticated,
  transactionController.add
);

transactionRouter.get(
  "/api/v1/transaction/lists",
  isAuthenticated,
  transactionController.lists
);

module.exports = transactionRouter;
