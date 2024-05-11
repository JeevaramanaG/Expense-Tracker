const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Transaction = require("../models/Transaction");

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

  // Update Category
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = Category.find(categoryId);

    if (!category && category.user.toLowerCase() !== req.user.toLowerCase()) {
      throw new Error("category not found or user not authorized");
    }

    const oldCategory = name;
    // update category
    category.name = name;
    category.type = type;
    const updateCategory = await category.save();

    // Update Transantion table
    if (!oldCategory !== updateCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldCategory,
        },
        {
          $set: {
            category: updateCategory.name,
          },
        }
      );
    }
  }),

  // Delete Category
  delete: asyncHandler(async (req, res) => {
    const category = Category.findById(req.params.id);

    if (category && category.user.toString() === req.user.toString()) {
      //Store the default Category before deleting

      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.user,
          category: category._id,
        },
        {
          $set: {
            category: defaultCategory,
          },
        }
      );
      await category.findByIdAndDelete(req.params.id);
      res.json({ message: `Category ${category.name} has been deleted.` });
    } else {
      res.json({ message: "user unAuthorized" });
    }
  }),
};

module.exports = CategoryController;
