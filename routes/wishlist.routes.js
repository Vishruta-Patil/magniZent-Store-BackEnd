const express = require("express");
const router = express.Router();
const {
  getProductsFromWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../cantrollers/wishlist.cantroller");
const { authVerify } = require("../middleware/authVerify");

router
  .route("/")
  .get(authVerify, getProductsFromWishlist)
  .post(authVerify, addToWishlist);

router.route("/:productId").delete(authVerify, removeFromWishlist);

module.exports = router;
