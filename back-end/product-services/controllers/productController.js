const Product = require("../models/Product");

const getProducts = async (request, response) => {
  try {
    const products = await Product.find({
      productOwnerUsername: { $ne: request.user?.userName },
    }).sort({ createdAt: -1 });

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

const getMyProducts = async (request, response) => {
  try {
    const products = await Product.find({
      productOwnerUsername: request.user.userName,
    }).sort({ createdAt: -1 });

    if (!products) {
      return response.status(404).json({
        message: "No posted products",
      });
    }

    return response.json({
      products: products,
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
      productOwnerUsername: request.user.userName,
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

const getPriceTotal = async (request, response) => {
  try {
    const { products } = request.query;

    if (!Array.isArray(products)) {
      return response.status(400).json({ message: "Invalid product list" });
    }

    const _products = await Promise.all(
      products.map(async (product) => {
        return await Product.findById(product.id);
      })
    );

    const totalPrice = _products
      .filter((product) => product !== null)
      .reduce((sum, product) => sum + product.price, 0);

    return response.status(400).json({ totalPrice });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (request, response) => {
  try {
    const product = await Product.findOneAndDelete({
      productOwnerUsername: request.user?.userName,
      _id: request.params.productId,
    });

    if (!product) {
      return response.status(401).json({
        message: "Unauthorized to delete this product",
      });
    }
    return response.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getMyProducts,
  postProduct,
  deleteProduct,
  getPriceTotal,
};
