const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductById);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductById);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductById);

module.exports = router;
