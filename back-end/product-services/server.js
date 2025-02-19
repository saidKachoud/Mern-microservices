const express = require("express");
const dbConnection = require("./config/dbConnection");
require("dotenv").config();
const upload = require("./upload");
const {
  postProduct,
  getProducts,
  deleteProduct,
  getMyProducts,
  getPriceTotal,
} = require("./controllers/productController");
const isAuthenticated = require("./middlewares/isAuthenticated");
const cors = require("cors");

const server = express();
dbConnection();

server.use(cors());
server.use(express.json());
server.use("/images", express.static("public/images"));

server.get("/getProducts", isAuthenticated, getProducts);
server.get("/getMyProducts", isAuthenticated, getMyProducts);
server.post(
  "/addProduct",
  upload.single("image"),
  isAuthenticated,
  postProduct
);
server.delete("/deleteProduct/:productId", isAuthenticated, deleteProduct);
server.get("/getPriceTotal", isAuthenticated, getPriceTotal);

server.listen(process.env.PORT, () => {
  console.log(`Product services listenning on PORT ${process.env.PORT}`);
});
