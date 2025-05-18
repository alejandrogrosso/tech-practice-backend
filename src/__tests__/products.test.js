const request = require('supertest');
const app = require('../app');
const fs = require('fs/promises');
const path = require('path');

// Mock fs.readFile
jest.mock('fs/promises', () => ({
  readFile: jest.fn()
}));

describe('API de Productos', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('debe devolver un array de productos', async () => {
      const mockProducts = {
        products: [
          {
            id: 'SAMGA55-256',
            title: 'Samsung Galaxy A55',
            price: 699.99,
            pictures: [{ url: 'test.jpg' }]
          }
        ]
      };
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockProducts));

      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('id', 'SAMGA55-256');
    });

    it('debe manejar errores de lectura de archivo', async () => {
      fs.readFile.mockRejectedValueOnce(new Error('File read error'));
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error', 'Error interno del servidor');
    });
  });

  describe('GET /api/products/:id', () => {
    it('debe devolver el producto correcto', async () => {
      const mockProducts = {
        products: [
          {
            id: 'SAMGA55-256',
            title: 'Samsung Galaxy A55',
            price: 699.99,
            pictures: [{ url: 'test.jpg' }],
            payment_methods: [],
            rating: 4.5,
            related_products: []
          }
        ]
      };
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockProducts));

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
      const mockProducts = {
        products: [
          {
            id: 'SAMGA55-256',
            title: 'Samsung Galaxy A55'
          }
        ]
      };
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockProducts));

      const res = await request(app).get('/api/products/NOEXISTE');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'Producto no encontrado');
    });

    it('debe manejar errores de lectura de archivo', async () => {
      fs.readFile.mockRejectedValueOnce(new Error('File read error'));
      const res = await request(app).get('/api/products/SAMGA55-256');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error', 'Error interno del servidor');
    });
  });

  describe('GET /api/health', () => {
    it('debe devolver status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
    });
  });

  describe('GET /api/products/brand/:brand', () => {
    it('debe devolver productos de la marca Samsung', async () => {
      const mockProducts = {
        products: [
          {
            id: 'SAMGA55-256',
            title: 'Samsung Galaxy A55',
            brand: 'Samsung'
          }
        ]
      };
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockProducts));

      const res = await request(app).get('/api/products/brand/Samsung');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach(prod => {
        expect(prod).toHaveProperty('brand', 'Samsung');
      });
    });

    it('debe devolver un array vacío si la marca no existe', async () => {
      const mockProducts = {
        products: [
          {
            id: 'SAMGA55-256',
            title: 'Samsung Galaxy A55',
            brand: 'Samsung'
          }
        ]
      };
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockProducts));

      const res = await request(app).get('/api/products/brand/NoExiste');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('debe manejar errores de lectura de archivo', async () => {
      fs.readFile.mockRejectedValueOnce(new Error('File read error'));
      const res = await request(app).get('/api/products/brand/Samsung');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error', 'Error interno del servidor');
    });
  });

  describe('GET /api/products/brand/Samsung/showcase', () => {
    it('debe devolver productos de Samsung en formato showcase', async () => {
      const mockProducts = {
        products: [
          {
            id: 'SAMGA55-256',
            title: 'Samsung Galaxy A55',
            brand: 'Samsung',
            price: 699.99,
            original_price: 799.99,
            pictures: [{ url: 'test.jpg' }],
            installments: {
              quantity: 10,
              amount: 69.99
            },
            free_shipping: true
          }
        ]
      };
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockProducts));

      const res = await request(app).get('/api/products/brand/Samsung/showcase');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach(prod => {
        expect(prod).toHaveProperty('img');
        expect(prod).toHaveProperty('title');
        expect(prod).toHaveProperty('price');
        expect(prod).toHaveProperty('old');
        expect(prod).toHaveProperty('off');
        expect(prod).toHaveProperty('cuotas');
        expect(prod).toHaveProperty('envio');
        expect(prod).toHaveProperty('link');
      });
    });

    it('debe devolver máximo 2 productos', async () => {
      const mockProducts = {
        products: [
          {
            id: 'SAMGA55-256',
            title: 'Samsung Galaxy A55',
            brand: 'Samsung'
          },
          {
            id: 'SAMGA55-512',
            title: 'Samsung Galaxy A55 512GB',
            brand: 'Samsung'
          },
          {
            id: 'SAMGA55-128',
            title: 'Samsung Galaxy A55 128GB',
            brand: 'Samsung'
          }
        ]
      };
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockProducts));

      const res = await request(app).get('/api/products/brand/Samsung/showcase');
      expect(res.body.length).toBeLessThanOrEqual(2);
    });

    it('debe manejar errores de lectura de archivo', async () => {
      fs.readFile.mockRejectedValueOnce(new Error('File read error'));
      const res = await request(app).get('/api/products/brand/Samsung/showcase');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error', 'Error interno del servidor');
    });
  });
}); 