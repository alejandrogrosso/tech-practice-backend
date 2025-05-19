function calculateDiscountPercentage(originalPrice, price) {
  if (!originalPrice || !price) return null;
  const percent = Math.round((1 - price / originalPrice) * 100);
  return percent + '% OFF';
}

function formatInstallments(installments) {
  if (!installments || !installments.quantity || !installments.amount) return null;
  const amount = installments.amount.toLocaleString('es-UY', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).replace('US$', '').trim();
  return `${installments.quantity} cuotas de $ ${amount} sin interés`;
}

function formatPrice(price) {
  return price ? price.toString().replace('.', ',') : null;
}

module.exports = { calculateDiscountPercentage, formatInstallments, formatPrice }; 