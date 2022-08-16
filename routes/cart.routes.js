const express = require("express");
const router = express.Router();
const {
  getAllProductsFromCart,
  addToCart,
  removeFromCart,
  updateCart
} = require("../cantrollers/cart.cantroller");
const { authVerify } = require("../middleware/authVerify");

router
  .route("/")
  .get(authVerify, getAllProductsFromCart)
  .post(authVerify, addToCart);

router.route("/:productId").post(authVerify, updateCart).delete(authVerify, removeFromCart);

module.exports = router;
