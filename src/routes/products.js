const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.get('/brand/:brand', productsController.getProductsByBrand);
router.get('/brand/Samsung/showcase', productsController.getSamsungShowcaseProducts);

module.exports = router; 