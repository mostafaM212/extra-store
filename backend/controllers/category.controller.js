const Category = require("../models/category.modal");

exports.getCategories = (req, res, next) => {
  Category.find()
    .then((data) => {
      return res.status(200).json({
        message: "categories successfully",
        categories: data,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error occurs on fetched data",
      });
    });
};

exports.getCategory = (req, res, next) => {
  Category.findOne({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json({
        message: "categories successfully",
        category: data,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error occurs on fetched data",
      });
    });
};
exports.addCategory = (req, res, next) => {
  console.log("test", req.body);

  const category = new Category({
    ...req.body,
  });
  console.log("test", category);

  category
    .save()
    .then((data) => {
      return res.status(200).json({
        message: "category created successfully",
        category: data,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "category not created",
      });
    });
};
exports.updateCategory = (req, res, next) => {
  Category.updateOne(
    { _id: req.params.id },
    { name: req.body.name, description: req.body.description }
  )
    .then((data) => {
      return res.status(200).json({
        message: "categories successfully",
        category: data,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error occurs on fetched data",
      });
    });
};
exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json({
        message: "category deleted successfully",
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error occurs on fetched data",
      });
    });
};
