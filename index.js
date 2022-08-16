const express = require("express")
const connectDB = require("./db/db.connect")

const product = require("./routes/product.routes")
const category = require('./routes/category.routes')
const auth = require('./routes/auth.routes')

const app = express()
app.use(express.json())
connectDB()

app.get("/", (req,res) => {
    res.send("Shree Krishna Govinda Hari Murari Yaenatha Narayan Vasudeva Radhae Radhae")
})

// routes middleware
app.use("/products", product)
app.use("/categories", category)
app.use("/", auth)

app.listen(8000, () => {
    console.log("server started")
})