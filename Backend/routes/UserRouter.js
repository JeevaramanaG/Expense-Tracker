const express = require("express");
const userController = require("../controllers/UserCtrl");
const userRouter = express.Router();

userRouter.post("/api/v1/users/register", userController.register);
userRouter.get("/api/v1/users/login", userController.login);

module.exports = userRouter;
