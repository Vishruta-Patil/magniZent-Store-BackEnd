const Wishlist = require('../model/wishlist.model')


// @desc    Get All Products from Wishlist
// @route   GET api/wishlist
// @access  Private
exports.getProductsFromWishlist = async(req, res) => {
    try {
        const wishlist = await Wishlist.find({user: req._id}).populate("product")
        res.json({status: true, message: "Successfully fetched all products from the wishlist", wishlist})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
}


// @desc    Post Add Product to Wishlist
// @route   POST api/wishlist
// @access  Private
exports.addToWishlist = async(req,res) => {
    const {productId} = req.body
    if(!productId) {
        return res.status(400).json({status: false, message: "Provide the Product Id"})  
    }
    try {
        const isWishlist = await Wishlist.exists({user: req._id, product: productId})
        if(isWishlist) {
            return res.status(400).json({status: false, message: "Product is already in the wishlist"})
        }
        let wishlist = await Wishlist.create({user: req._id, product: productId})
        wishlist = await wishlist.populate("product")
        res.json({status: true, message: "Successfully added product to the wishlist", wishlist})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
}

// @desc    Delete Remove Product from Wishlist
// @route   DELETE api/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async(req,res) => {
    const {productId} = req.params
    try {
        const isWishlist = await Wishlist.exists({product: productId})
        if(!isWishlist) {
            return res.status(400).json({status: false, message: "Product is not present in the wishlist"})
        }

        const product = await Wishlist.findOneAndDelete({user: req._id, product: productId})
        res.json({status: true, message: "Successfully deleted product from the wishlist", product})
    } catch(error) {
        res.status(500).json({status: false, message: error.message})
    }
}
