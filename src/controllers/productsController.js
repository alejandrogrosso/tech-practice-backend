const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProductsByBrand = async (req, res, next) => {
  try {
    const brand = req.params.brand;
    const products = await productModel.getByBrand(brand);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getSamsungShowcaseProducts = async (req, res, next) => {
  try {
    const products = await productModel.getSamsungShowcaseProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}; 