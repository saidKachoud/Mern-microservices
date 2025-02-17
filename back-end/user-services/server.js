const express = require("express");
require("dotenv").config();
const {registerUser,login} = require("./controllers/userController");
const dbConnection = require("./config/dbConnection");
const server = express();

dbConnection();

server.use(express.json())

server.post("/login", login);
server.post("/register", registerUser);

server.listen(process.env.PORT, () =>{
    console.log(`User services listenning on PORT ${process.env.PORT}`);
})