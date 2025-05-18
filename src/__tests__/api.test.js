const request = require('supertest');
const express = require('express');
const path = require('path');

// Mock de fs/promises
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));
const fs = require('fs/promises');

// Importar la app
const app = require('../app');

describe('API Endpoints', () => {
  const mockProduct = {
    id: 'SAMGA55-256',
    title: 'Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM',
    price: 439,
    pictures: [],
    seller: {},
    // ...otros campos omitidos para el test
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a product when it exists', async () => {
      fs.readFile.mockResolvedValue(
        JSON.stringify({
          products: [mockProduct],
        })
      );

      const res = await request(app).get(`/api/products/${mockProduct.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', mockProduct.id);
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('price');
      expect(res.body).toHaveProperty('pictures');
      expect(res.body).toHaveProperty('seller');
    });

    it('should return 404 when product does not exist', async () => {
      fs.readFile.mockResolvedValue(
        JSON.stringify({
          products: [mockProduct],
        })
      );

      const res = await request(app).get('/api/products/nonexistent');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should handle file read errors', async () => {
      fs.readFile.mockRejectedValue(new Error('File read error'));

      const res = await request(app).get(`/api/products/${mockProduct.id}`);
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      fs.readFile.mockResolvedValue(
        JSON.stringify({
          products: [mockProduct],
        })
      );

      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('id', mockProduct.id);
      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0]).toHaveProperty('price');
      expect(res.body[0]).toHaveProperty('pictures');
      expect(res.body[0]).toHaveProperty('seller');
    });

    it('should handle file read errors', async () => {
      fs.readFile.mockRejectedValue(new Error('File read error'));

      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error');
    });
  });
}); 