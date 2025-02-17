// create here the user model (fullName, username(unique), email(unique), role(admin,user), password:(hashed));
const mongoose = require("mongoose")


const userSchema =new mongoose.Schema({
    fullName: {type : String ,required : true},
    username: {type : String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model("User", userSchema);
