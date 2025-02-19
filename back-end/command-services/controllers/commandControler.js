const command = require("../models/command");
const Command = require("../models/command");
require("dotenv").config();
const getCommands = async (request, response) => {
  try {
    const commands = await Command.find({
      email: request.user?.email,
    }).sort({ createdAt: -1 });

    if (commands) {
      return response.json({
        commands,
      });
    }

    return response.status(404).json({
      message: "No commands founded",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const postCommand = async (request, response) => {
  try {
    const { products } = request.body;
    const response = await axios.get(
      `${process.env.PRODUCT_URL}/getPriceTotal?products=${products}`
    );
    const _totalPrice = response.data.totalPrice;
    const newCommand = new Command({
      email: request.user.email,
      products,
      price_Total: _totalPrice,
    });
    await newCommand.save();
    return response.json({
      message: "Product added successfully",
      command: newCommand,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const deleteCommand = async (request, response) => {
  try {
    const command = await Command.findByIdAndDelete({
      email: request.user?.email,
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
