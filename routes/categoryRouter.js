const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
router.get('/categories', auth, authAdmin, categoryController.getCategories)
router.post('/create-category', auth, authAdmin, categoryController.createCategory)
router.delete('/delete-category', auth, authAdmin, categoryController.deleteCategory)
router.put('/update-category', auth, authAdmin, categoryController.updateCategory)

module.exports = router