const router = require('express').Router()
const productController = require('../controllers/productController')
const authAdmin = require('../middleware/authAdmin')
const auth = require('../middleware/auth')
router.route('/products')
    .get(productController.getProducts)
    .post(auth, authAdmin, productController.postProduct)

router.route('/products/:id')
    .put(auth, productController.putProduct)
    .delete(auth, authAdmin, productController.deleteProduct)


module.exports = router