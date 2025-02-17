const mongoose = require("mongoose");

const commandShema = new mongoose.Schema(
  {
    email: { required: true, type: String },
    products: [
      {
        id: { required: true, type: String },
        name: { required: true, type: String },
        price: { required: true, type: Number },
      },
    ],
    price_Total: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Command", commandShema);
