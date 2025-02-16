const express = require("express");
require("dotenv").config();
const {registerUser,login} = require("./controllers/userController")
const server = express();

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", login);

server.listen(process.env.PORT, () =>{
    console.log(`User services listenning on PORT ${process.env.PORT}`);
})