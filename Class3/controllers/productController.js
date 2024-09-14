// import ProductModel from "../models/ProductModel";
const ProductModel = require("../models/ProductModel")
const mongoose = require("mongoose");
/**
 * Difference between PUT and PATCH
 * PUT is used to replace entire document
 * we provide all info even if we want to update a single attribute else entire document will be overwritten with default values
 * 
 * PATCH is used to update specific attribute in a document
 * partial updates, include only fields you want to update
 * 
 * PATCH requests are more efficient 
 */


const getAllProducts = async (req, res) => {

    try {
        const products = await ProductModel.find();
        return res.status(200).json({ message: "Products fetched Successfully", data: products });
    } catch (error) {
        res.status(500).send(error)
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json("Id not found");
        }
        return res.status(200).json({ message: "Product fetched Successfully", data: product });
    } catch (error) {
        res.status(500).json(error);
    }

};

const createProduct = async (req, res) => {
    const body = req.body;
    // we can insert using create or save method
    // const newProduct = await ProductModel.create({
    //     product_name: body.product_name,
    //     product_price: body.product_price,
    //     category: body.category,
    //     isInStock: body.isInStock
    // });

    try {
        console.log("before product created")
        const newProduct = await new ProductModel(body).save();
        if (!newProduct) {
            return res.status(404).send("Error while creating product")
        }
        console.log("after product created")
        res.json({ message: "Product created Successfully", data: newProduct });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const updateProductById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json("Invalid product ID format");
    }

    try {
        const product = await ProductModel.findById(id);
        console.log("----------------", product)
        if (!product) {
            return res.status(404).json("Invalid product id");
        }
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json("Failed to update product");
        }
        res.status(200).json(updatedProduct);

        console.log("----------------", updatedProduct)

    } catch (error) {
        res.status(500).json(error)
    }
}

const updateProductByPatch = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json("Invalid id format");
    }
    try {

        const product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!product) {
            return res.status(404).json("Invalid id");
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).send(error);
    }
}

const deletedProductByID = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json("Invalid id format");
    }
    try {
        const product = await ProductModel.findById(id);
        if (product) {
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
            res.status(201).json(`Product ${deletedProduct.product_name} deleted successfully`);
        } else {
            return res.status(404).json("Invalid Product id");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { getAllProducts, getProductById, createProduct, updateProductById, updateProductByPatch, deletedProductByID }