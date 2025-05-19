const fs = require('fs/promises');
const path = require('path');
const { calculateDiscountPercentage, formatInstallments, formatPrice } = require('../helpers/productHelpers');

const DATA_PATH = path.join(__dirname, '../data/products.json');

async function readData() {
  const data = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(data).products;
}

async function writeData(products) {
  await fs.writeFile(DATA_PATH, JSON.stringify({ products }, null, 2));
}

async function getAll({ brand, featured, limit, page } = {}) {
  let products = await readData();
  if (brand) products = products.filter(p => p.brand && p.brand.toLowerCase() === brand.toLowerCase());
  if (featured) products = products.filter(p => p.featured);
  if (limit) {
    const l = parseInt(limit, 10);
    const p = parseInt(page || 1, 10);
    products = products.slice((p - 1) * l, p * l);
  }
  return products;
}

async function getById(id) {
  const products = await readData();
  return products.find(p => p.id === id);
}

// Ejemplo de función para productos destacados (showcase)
async function getFeatured({ brand, limit = 2 } = {}) {
  let products = await getAll({ brand });
  products = products.filter(p => p.featured || true); // Ajusta la lógica según tu JSON
  return products.slice(0, limit).map(p => ({
    img: p.pictures && p.pictures[0] ? p.pictures[0].url : '',
    title: p.title,
    price: formatPrice(p.price),
    old: formatPrice(p.original_price),
    off: calculateDiscountPercentage(p.original_price, p.price),
    cuotas: formatInstallments(p.installments),
    envio: p.free_shipping ? 'Envío gratis' : '',
    link: `/product/${p.id}`
  }));
}

module.exports = { getAll, getById, getFeatured }; 