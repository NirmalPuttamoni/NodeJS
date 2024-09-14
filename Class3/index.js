const express = require("express")
const app = express();
const ProductModel = require("./models/ProductModel");
const connectDB = require("./config/db");
const productRoute = require("./routes/productRoutes")
const userRoute = require("./routes/userRoutes")
app.use(express.json());

connectDB();

//routes
app.use("/api/products", productRoute);
app.use("/api/users/", userRoute);
//global error handler
app.use((err, req, res)=>{
    console.log(err);
    return res.status(500).json({message : "Internal server error"})
})

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
