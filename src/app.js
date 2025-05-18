const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productsRoutes = require('./routes/products');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/products', productsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

app.use(errorHandler);

module.exports = app; 