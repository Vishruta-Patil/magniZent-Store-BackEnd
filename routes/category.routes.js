const express = require('express')
const router = express.Router()
const {getAllCategories} = require('../cantrollers/category.cantroller')

router.route("/").get(getAllCategories)

module.exports = router