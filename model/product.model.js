const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    product_name: String,
    product_price: Number,
    product_offer: Number,
    product_desc: String,
    img_url: String,
    info: {
      ratings: Number,
      category: String
    }
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product