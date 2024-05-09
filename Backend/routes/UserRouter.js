const express = require("express");
const userController = require("../controllers/UserCtrl");
const userRouter = express.Router();

// register api
userRouter.post("/api/v1/users/register", userController.register);

// login api
userRouter.get("/api/v1/users/login", userController.login);

// profile api
userRouter.get("/api/v1/users/profile", userController.profile);

module.exports = userRouter;
