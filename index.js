const express = require("express")
const connectDB = require("./db/db.connect")
const pageNotFound = require("./middleware/pageNotFound")

const product = require("./routes/product.routes")
const category = require('./routes/category.routes')
const auth = require('./routes/auth.routes')
const cart = require('./routes/cart.routes')
const wishlist = require('./routes/wishlist.routes')

const app = express()
app.use(express.json())
connectDB()

const port = process.env.PORT || 8000

app.get("/", (req,res) => {
    res.send("Shree Krishna Govinda Hari Murari Yaenatha Narayan Vasudeva Radhae Radhae")
})

// routes middleware
app.use("/products", product)
app.use("/categories", category)
app.use("/", auth)
app.use("/cart", cart)
app.use("/wishlist", wishlist)

app.use(pageNotFound)

app.listen(port, () => {
    console.log("server started")
})