const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/CategoryCtrl");
const isAuthenticated = require("../middlewares/isAuthentication");

categoryRouter.post(
  "/api/v1/category/add",
  isAuthenticated,
  categoryController.create
);

categoryRouter.get(
  "/api/v1/category/lists",
  isAuthenticated,
  categoryController.lists
);

module.exports = categoryRouter;
