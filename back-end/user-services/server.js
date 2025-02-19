const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { registerUser, login, logout } = require("./controllers/userController");
const dbConnection = require("./config/dbConnection");
const server = express();

dbConnection();

server.use(cors());
server.use(express.json());

server.post("/login", login);
server.post("/register", registerUser);
server.post("/logout", logout);

server.listen(process.env.PORT, () => {
  console.log(`User services listenning on PORT ${process.env.PORT}`);
});
