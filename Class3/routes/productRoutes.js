const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProductById, updateProductByPatch, deletedProductByID } = require("../controllers/productController");
const productRouter = express.Router();

// get all products
productRouter.get("/", getAllProducts); // /api/products/

// create a product
productRouter.post("/", createProduct)

// get a product by id
productRouter.get("/:id", getProductById); // /api/products/:id

// update a product By id
productRouter.put("/:id", updateProductById);

//update a product attribute by id using patch
productRouter.patch("/:id", updateProductByPatch);

// delete a product By Id
productRouter.delete("/:id", deletedProductByID);

module.exports = productRouter;