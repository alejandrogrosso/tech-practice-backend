const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { brand, featured, limit, page } = req.query;
    const products = await productModel.getAll({ brand, featured, limit, page });
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

exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const { brand, limit } = req.query;
    const products = await productModel.getFeatured({ brand, limit });
    res.json(products);
  } catch (error) {
    next(error);
  }
}; 