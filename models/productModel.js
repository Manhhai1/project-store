const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    price: {
        type: Number,
        require: true,
        trim: true,
    },
    descriptionMarkdown: {
        type: String,
        require: true,
        trim: true,
    },
    descriptionHTML: {
        type: String,
        require: true,
        trim: true,
    },
    images: {
        type: Array,
        require: true,
    },
    type: {
        type: String,
        require: true,
        trim: true,
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Products', productSchema)