const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
    productOwnerUsername : {type : String},
    name : {required:true, type:String},
    description : {required:true, type: String},
    image : {required:true, type: String},
    price : {required:true, type: Number},
},{timestamps : true});

module.exports = mongoose.model("Product",productShema);