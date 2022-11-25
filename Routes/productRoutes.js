const {Router} = require('express')
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../Controller/productController')


const router= Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('', addProduct)
router.put('/:id',  updateProduct)
router.delete('/:id',deleteProduct)


module.exports={router}