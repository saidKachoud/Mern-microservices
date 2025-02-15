const express = require("express");
require("dotenv").config();

const server = express();


// here you will make call to userControllers

// example: server.post('/login', login)

server.listen(process.env.PORT, () =>{
    console.log(`User micro-services listenning on PORT ${process.env.PORT}`);
})