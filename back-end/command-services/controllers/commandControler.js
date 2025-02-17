const command = require("../models/command");
const Command = require("../models/command");

const getCommands = async (request, response) => {
  try {
    const commannds = await Command.find();
    if (commannds) {
      return response.json({
        commands: commannds,
      });
    }
    return response.status(404).json({
      message: "Comands not found",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const postCommand = async (request, response) => {
  try {
    const {
      email,
      products: [{ product_id, product_name, price_product }],
    } = request.body;

    const total = 200;

    const newCommand = new Command({
      email,
      products: [{ id: product_id, name: product_name, price: price_product }],
      price_Total: total,
    });
    await newCommand.save();
    return response.json({
      message: "create command success",
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
    await Product.findByIdAndDelete(request.params.commandId);

    return response.status(404).json({
      message: "Command not found",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getCommands, postCommand, deleteCommand };
