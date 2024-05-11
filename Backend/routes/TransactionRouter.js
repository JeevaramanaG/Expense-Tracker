const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../controllers/TransactionCtrl");
const isAuthenticated = require("../middlewares/isAuthentication");

//Tansaction API for add
transactionRouter.post(
  "/api/v1/transaction/add",
  isAuthenticated,
  transactionController.add
);

//Transaction API for lists the data
transactionRouter.get(
  "/api/v1/transaction/lists",
  isAuthenticated,
  transactionController.lists
);

// API for filtering
transactionRouter.get(
  "/api/v1/transaction/filter",
  isAuthenticated,
  transactionController.getFilterTransaction
);

// Api for Update Transaction

transactionRouter.put(
  "/api/v1/transaction/update/:id",
  isAuthenticated,
  transactionController.updateTransaction
);

// API for Deleting Transaction

transactionRouter.delete(
  "/api/v1/transaction/delete/:id",
  isAuthenticated,
  transactionController.deleteTransaction
);

module.exports = transactionRouter;
