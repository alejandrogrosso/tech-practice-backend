const request = require('supertest');
const app = require('../app');

describe('API de Productos', () => {
  describe('GET /api/products', () => {
    it('debe devolver un array de productos', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      // Verifica campos clave
      const prod = res.body[0];
      expect(prod).toHaveProperty('id');
      expect(prod).toHaveProperty('title');
      expect(prod).toHaveProperty('price');
      expect(prod).toHaveProperty('pictures');
    });
  });

  describe('GET /api/products/:id', () => {
    it('debe devolver el producto correcto', async () => {
      const res = await request(app).get('/api/products/SAMGA55-256');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 'SAMGA55-256');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('price');
      expect(res.body).toHaveProperty('pictures');
      expect(res.body).toHaveProperty('payment_methods');
      expect(res.body).toHaveProperty('rating');
      expect(res.body).toHaveProperty('related_products');
    });

    it('debe devolver 404 si el producto no existe', async () => {
      const res = await request(app).get('/api/products/NOEXISTE');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/health', () => {
    it('debe devolver status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
    });
  });
}); 