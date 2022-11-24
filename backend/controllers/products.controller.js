const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/product.model");
const APIFeatures = require("../utils/apiFeatures");

const ErrorHandler = require("../utils/errorHandler");

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    prodPerPage: products.length,
    productCount,
    products,
  });
});

exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("products not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProductById = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("products not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProductById = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("products not found", 404));
  }

  await Product.deleteOne();

  res.status(200).json({
    success: true,
    msg: "Product was deleted",
  });
});
