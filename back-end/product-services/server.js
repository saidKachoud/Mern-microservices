const express = require("express");
const dbConnection = require("./config/dbConnection");
require("dotenv").config();
const upload = require("./upload");
const { postProduct, getProducts, deleteProduct } = require("./controllers/productController");

const server = express();
dbConnection();

server.use(express.json());
server.use("/images", express.static("public/images"));

server.get("/getProducts",getProducts);
server.post("/addProduct",upload.single("image"),postProduct);
server.delete("/deleteProduct/:productId",deleteProduct);

server.listen(process.env.PORT, () =>{
    console.log(`Product services listenning on PORT ${process.env.PORT}`);
});