require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Ruta para obtener detalles de un producto específico
app.get('/api/products/:id', async (req, res) => {
  try {
    const productsData = await fs.readFile(
      path.join(__dirname, 'data', 'products.json'),
      'utf8'
    );
    const products = JSON.parse(productsData).products;
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    res.json(product);
  } catch (error) {
    console.error('Error al leer el archivo de productos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const productsData = await fs.readFile(
      path.join(__dirname, 'data', 'products.json'),
      'utf8'
    );
    const products = JSON.parse(productsData).products;
    res.json(products);
  } catch (error) {
    console.error('Error al leer el archivo de productos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// Rutas de ejemplo
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
}); 