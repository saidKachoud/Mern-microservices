const express = require("express");
require("dotenv").config();
const dbconnection = require("./config/dbConnection");
const {
  postCommand,
  getCommands,
  deleteCommand,
} = require("./controllers/commandControler");
const server = express();

dbconnection();
server.use(express.json());

server.post("/getCommand", getCommands);
server.post("/addCommand", postCommand);
server.post("/deleteCommand/:commandId", deleteCommandCommand);

server.listen(process.env.PORT, () => {
  console.log(`Command services listenning on PORT ${process.env.PORT}`);
});
