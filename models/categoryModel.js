const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    }
})
module.exports = mongoose.model('Categories', categorySchema)