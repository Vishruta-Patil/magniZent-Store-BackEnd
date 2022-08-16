const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema)
module.exports = Wishlist