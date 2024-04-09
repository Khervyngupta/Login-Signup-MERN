const mongoose = require("mongoose")

const RegisterDetail = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const RegisterModel = mongoose.model("registration", RegisterDetail)
module.exports = RegisterModel