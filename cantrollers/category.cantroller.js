const Category = require("../model/category.model")

// @desc    Get All Categories
// @route   GET api/categories
// @access  Public
exports.getAllCategories = async(req,res) => {
    try {
        const categories = await Category.find({})
        res.json({status: true, message: "Successfully fetched all categories", categories})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
} 