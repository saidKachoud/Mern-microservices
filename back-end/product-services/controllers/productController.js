const { request, response } = require("express");
const Product = require("../models/Product");

const getProducts = async (request, response) => {
  try {
    const products = await Product.find();
    if (products) {
      return response.json({
        products: products,
      });
    }

    return response.status(404).json({
      message: "No products founded",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const postProduct = async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).json({
        message: "Product image required",
      });
    }

    const { name, description, price } = request.body;
    const imageUrl = `/images/${request.file.filename}`;

    const newProduct = new Product({
      name,
      description,
      image: imageUrl,
      price,
    });
    await newProduct.save();

    response.json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (request, response) => {
  try {
    await Product.findByIdAndDelete(request.params.productId);

    return response.status(404).json({
      message: "Product not found",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getProducts, postProduct, deleteProduct };
