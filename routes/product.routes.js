const express = require('express')
const router = express.Router()
const {getAllProducts, getProduct} = require('../cantrollers/product.cantroller')

router.route("/").get(getAllProducts)
router.route("/:productId").get(getProduct)

module.exports = router