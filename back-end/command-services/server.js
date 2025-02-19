const express = require("express");
require("dotenv").config();
const dbconnection = require("./config/dbConnection");
const {
  postCommand,
  getCommands,
  deleteCommand,
} = require("./controllers/commandControler");
const cors = require("cors");
const isAuthenticated = require("./middlewares/isAuthenticated");
const server = express();

dbconnection();
server.use(express.json());
server.use(cors);

server.get("/getCommands", isAuthenticated, getCommands);

server.post("/addCommand", isAuthenticated, postCommand);
server.delete("/deleteCommand/:commandId", isAuthenticated, deleteCommand);

server.listen(process.env.PORT, () => {
  console.log(`Command services listenning on PORT ${process.env.PORT}`);
});
