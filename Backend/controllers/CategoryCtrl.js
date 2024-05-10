const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

const CategoryController = {
  create: asyncHandler(async (req, res) => {
    const { username, type } = req.body;
    // data from the body
    if (!username || !type) {
      throw new Error("Username and type is required");
    }

    const normalizedname = username.toLowercase();
    // check the user valid or not
    const validType = ["income", "expense"];
    if (!validType.includes(type.toLowercase())) {
      throw new Error("Invalid type" + type);
    }

    // check the type already exist on the user
    const categoryExists = await Category.findOne({
      name: normalizedname,
      user: req.user,
    });
    // chech the category is exists or not
    if (categoryExists) {
      throw new Error(`${categoryExists.name} is already exists in database`);
    }
    // create a category in database
    const createCategory = await Category.create({
      username: normalizedname,
      type: type.toLowerCase(),
      user: req.user,
    });
    res.status(201).json(createCategory);
  }),

  lists: asyncHandler(async (req, res) => {
    const category = Category.find({
      user: req.user,
    });
    res.status(200).json(category);
  }),

  update: asyncHandler(async (req, res) => {}),

  delete: asyncHandler(async (req, res) => {}),
};
module.exports = CategoryController;
