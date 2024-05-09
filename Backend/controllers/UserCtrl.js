const asyncHandler = require("express-async-handler");
const user = require("../models/User");

const userController = {
  // Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    res.json({ message: "register" });
  }),
  // login
  //profile
};
module.exports = userController;
