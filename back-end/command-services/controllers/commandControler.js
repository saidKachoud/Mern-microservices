const { default: axios } = require("axios");
const Command = require("../models/command");
require("dotenv").config();
const getCommands = async (request, response) => {
  try {
    const commands = await Command.find({
      email: request.user?.userEmail,
    }).sort({ createdAt: -1 });

    if (commands) {
      return response.json({
        commands: commands,
      });
    }

    return response.status(404).json({
      message: "No commands founded",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const postCommand = async (request, response) => {
  try {
    const products = request.body.data;

    if (!Array.isArray(products)) {
      return response.status(400).json({ message: "Invalid product list" });
    }

    const response_FROM_PRODUCTS_SERVICE = await axios.get(
      `${process.env.PRODUCT_URL}/getPriceTotal`,
      {
        params: { products },
        headers: {
          Authorization: `Bearer ${
            request.headers["authorization"].split(" ")[1]
          }`,
        },
      }
    );

    const _totalPrice = response_FROM_PRODUCTS_SERVICE.data.totalPrice;

    const newCommand = new Command({
      email: request.user.userEmail,
      products,
      price_Total: _totalPrice,
    });

    await newCommand.save();

    return response.json({
      message: "Command added successfully",
      command: newCommand,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: error.message || "An error occurred",
    });
  }
};

const deleteCommand = async (request, response) => {
  try {
    const command = await Command.findByIdAndDelete({
      email: request.user?.userEmail,
      _id: request.params.commandId,
    });
    if (!command) {
      return response.status(404).json({
        message: "Command not found or Unauthorized to delete this product",
      });
    }

    return response.status(404).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getCommands, postCommand, deleteCommand };
