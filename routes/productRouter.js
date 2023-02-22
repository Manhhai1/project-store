const router = require('express').Router()
const productController = require('../controllers/productController')
router.route('/products')
    .get(productController.getProducts)
    .post(productController.postProduct)


router.route('/products/:id')
    .put(productController.putProduct)
    .delete(productController.deleteProduct)


module.exports = router