const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number
})

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart