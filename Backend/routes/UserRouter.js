const express = require("express");
const userController = require("../controllers/UserCtrl");
const isAuthenticated = require("../middlewares/isAuthentication");
const userRouter = express.Router();

// register api
userRouter.post("/api/v1/users/register", userController.register);

// login api
userRouter.post("/api/v1/users/login", userController.login);

// profile api
userRouter.get(
  "/api/v1/users/profile",
  isAuthenticated,
  userController.profile
);

// change password Api
userRouter.put(
  "/api/v1/users/change-password",
  isAuthenticated,
  userController.changePassword
);
// Update profile Api
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  userController.updateUserProfile
);

module.exports = userRouter;
