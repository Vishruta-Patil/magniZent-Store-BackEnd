const Product = require('../model/product.model')

// @desc    Get All Products
// @route   GET api/products
// @access  Public
exports.getAllProducts = async(req,res) => {
    try {
        const products = await Product.find({})
        res.json({status: true, message: "Successfully fetched all products", products})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
} 


// @desc    Get a single Product
// @route   GET api/product/:productId
// @access  Public
exports.getProduct = async(req,res) => {
    const {productId} = req.params
    try {
        const product = await Product.findById({_id: productId})
        if(!product) {
            res.status(404).json({status: true, message: "Product not found"})
        }
        res.json({status: true, message: "Successfully fetched a product", product})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
}