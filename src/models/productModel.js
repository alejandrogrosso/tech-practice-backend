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

async function getByBrand(brand) {
  const products = await getAll();
  return products.filter(p => p.brand && p.brand.toLowerCase() === brand.toLowerCase());
}

async function getSamsungShowcaseProducts() {
  const products = await getByBrand('Samsung');
  return products.map(p => {
    // Calcular descuento y cuotas
    const old = p.original_price ? p.original_price.toString().replace('.', ',') : null;
    const price = p.price ? p.price.toString().replace('.', ',') : null;
    let off = null;
    if (p.original_price && p.price) {
      const percent = Math.round((1 - p.price / p.original_price) * 100);
      off = percent + '% OFF';
    }
    // Cuotas (ejemplo: 10 cuotas de $ 4.181,24 sin interés)
    let cuotas = null;
    if (p.installments && p.installments.quantity && p.installments.amount) {
      const amount = p.installments.amount.toLocaleString('es-UY', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).replace('US$', '').trim();
      cuotas = `${p.installments.quantity} cuotas de $ ${amount} sin interés`;
    }
    return {
      img: p.pictures && p.pictures[0] ? p.pictures[0].url : '',
      title: p.title,
      price,
      old,
      off,
      cuotas,
      envio: p.free_shipping ? 'Envío gratis' : '',
      link: `/product/${p.id}`
    };
  });
}

module.exports = { getAll, getById, getByBrand, getSamsungShowcaseProducts }; 