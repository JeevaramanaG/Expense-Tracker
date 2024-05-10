const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

const CategoryController = {
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: "Name and type are required" });
    }

    const normalizedName = name.toLowerCase();

    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      return res.status(400).json({ error: "Invalid type: " + type });
    }
    // Check if the category already exists for the current user
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });

    if (categoryExists) {
      throw new Error(`${categoryExists.name} is already exists`);
    }
    // create category in database
    const createCategory = await Category.create({
      name: normalizedName,
      type: type.toLowerCase(),
      user: req.user,
    });

    res.status(201).json(createCategory);
  }),
  // display the list
  lists: asyncHandler(async (req, res) => {
    const categoryList = await Category.find({
      user: req.user,
    });

    res.status(200).json(categoryList);
  }),
};

module.exports = CategoryController;
