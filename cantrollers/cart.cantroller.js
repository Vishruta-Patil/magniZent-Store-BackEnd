const Cart = require("../model/cart.model")

// @desc    Get All Products from Cart
// @route   GET api/cart
// @access  Private
exports.getAllProductsFromCart = async(req, res) => {
    try {
        const cart = await Cart.find({user: req._id}).populate("product")
        res.json({status: true, message: "Successfully fetched all products from the cart", cart})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
}


// @desc    Post Add Product to Cart
// @route   POST api/cart
// @access  Private
exports.addToCart = async(req,res) => {
    const {productId} = req.body
    if(!productId) {
        return res.status(400).json({status: false, message: "Provide the Product Id"})  
    }
    try {
        const isCart = await Cart.exists({product: productId})
        if(isCart) {
            return res.status(400).json({status: false, message: "Product is already in the cart"})
        }
        let cart = await Cart.create({user: req._id, product: productId, quantity: 1})
        cart = await cart.populate("product")
        res.json({status: true, message: "Successfully added product to the cart", cart})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
}


// @desc    Delete Remove Product to Cart
// @route   DELETE api/cart/:productId
// @access  Private
exports.removeFromCart = async(req,res) => {
    const {productId} = req.params
    try {
        const isCart = await Cart.exists({product: productId})
        if(!isCart) {
            return res.status(400).json({status: false, message: "Product is not present in the cart"})
        }

        const product = await Cart.findOneAndDelete({user: req._id, product: productId})
        res.json({status: true, message: "Successfully deleted product from the cart", product})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
}


// @desc    Update Update Cart Quantity
// @route   POST api/cart/:productId
// @access  Private
exports.updateCart = async(req,res) => {
    const {productId} = req.params
    const {type} = req.body

    try {
        
        if(type === "INCREMENT") {
            const product = await Cart.findOneAndUpdate({user: req._id, product: productId}, { $inc: { quantity: 1 } }, {new: true })
            res.json({status: true, message: "Incremented product to the cart", product})
        } else if(type === "DECREMENT") {
            const product = await Cart.findOneAndUpdate({user: req._id, product: productId}, { $inc: { quantity: -1 } }, {new: true })
            res.json({status: true, message: "Incremented product to the cart", product})
        } else {
            return  res.status(400).json({status: true, message: "Provide proper type"})
        }
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
}
