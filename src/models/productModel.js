const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/products.json');

async function getAll() {
  const data = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(data).products;
}

async function getById(id) {
  const products = await getAll();
  return products.find(p => p.id === id);
}

module.exports = { getAll, getById }; 