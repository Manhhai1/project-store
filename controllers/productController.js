const { query } = require('express')
const Products = require('../models/productModel')
class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }
    filltering() {
        const queryObj = { ...this.queryString }
        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach((el) => delete (queryObj[el]))
        let queryJson = JSON.stringify(queryObj)
        queryJson = queryJson.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => "$" + match)

        let data = JSON.parse((queryJson))
        this.query.find(data)
        return this
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort
            console.log(sortBy)
            this.query.sort(sortBy)
        }
        else this.query.sort('createdAt')
        return this
    }
    paginating() {
        const page = this.queryString.page || 1
        const limit = this.queryString.limit || 4
        const skip = (page-1)*limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}
const productController = {
    getProducts: async (req, res) => {
        try {
            const featrues = new APIfeatures(Products.find(), req.query)
            featrues.filltering().sorting().paginating()
            const products = await featrues.query

            return res.json(products)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    postProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, checked, sold } = req.body
            const product = await Products.findOne({ product_id: product_id })
            if (product) return res.status(400).json({ message: 'product realdy exist' })
            const newProduct = new Products({ product_id, title, price, description, content, images, checked, sold })
            await newProduct.save()
            return res.json({ message: "create new product" })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    putProduct: async (req, res) => {
        try {
            if (!req.params.id) return res.status(400).json({ message: 'id is not found' })
            let product = await Products.findOneAndUpdate({ _id: req.params.id }, req.body)
            if (!product) return res.status(400).json({ message: 'not found product' })
            return res.json({ message: "update product" })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            if (!req.params.id) return res.status(400).json({ message: 'id is not found' })
            await Products.deleteOne({ _id: req.params.id })

            return res.json({ message: 'deleted product' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}
module.exports = productController