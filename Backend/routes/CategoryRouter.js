const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/CategoryCtrl");
const isAuthenticated = require("../middlewares/isAuthentication");

// API for creating new category
categoryRouter.post(
  "/api/v1/category/add",
  isAuthenticated,
  categoryController.create
);
// API for fetch all category
categoryRouter.get(
  "/api/v1/category/lists",
  isAuthenticated,
  categoryController.lists
);

// API for Update the Category
categoryRouter.put(
  "/api/v1/category/update",
  isAuthenticated,
  categoryController.update
);
// API for Delete the Category
categoryRouter.delete(
  "/api/v1/category/delete",
  isAuthenticated,
  categoryController.delete
);

module.exports = categoryRouter;
