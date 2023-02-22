const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        require: true,
        trim: true,
    },
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
    description: {
        type: String,
        require: true,
        trim: true,
    },
    content: {
        type: String,
        require: true,
        trim: true,
    },
    images: {
        type: Object,
        require: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    sold: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Products', productSchema)