const router = require('express')
const Categories = require('../models/categoryModel')
const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Categories.find()
            return res.status(400).json(categories)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body
            const category = await Categories.findOne({ name })
            if (category) return res.status(400).json({ message: "The name category is exists." })
            const newCategory = new Categories({
                name
            })
            await newCategory.save()
            return res.json({ message: 'category created success' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Categories.findByIdAndDelete(req.query.id)
            return res.json('deleted category')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body
            console.log(req)
            await Categories.findByIdAndUpdate({ _id: req.query.id }, { name })
            return res.json("update category success")

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = categoryController
