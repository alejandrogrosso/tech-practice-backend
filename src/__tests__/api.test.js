const request = require('supertest');
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

// Mock de fs.promises.readFile
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

// Importar la app
const app = require('../index');

describe('API Endpoints', () => {
  const mockProduct = {
    id: 'SAMGA55-256',
    title: 'Samsung Galaxy A55 5G',
    price: {
      currency: 'USD',
      amount: 439,
      decimals: 0,
    },
  };

  beforeEach(() => {
    // Limpiar todos los mocks
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
      // Mock de la lectura del archivo
      fs.promises.readFile.mockResolvedValue(
        JSON.stringify({
          products: [mockProduct],
        })
      );

      const res = await request(app).get(`/api/products/${mockProduct.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProduct);
    });

    it('should return 404 when product does not exist', async () => {
      // Mock de la lectura del archivo
      fs.promises.readFile.mockResolvedValue(
        JSON.stringify({
          products: [mockProduct],
        })
      );

      const res = await request(app).get('/api/products/nonexistent');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should handle file read errors', async () => {
      // Mock de error en la lectura del archivo
      fs.promises.readFile.mockRejectedValue(new Error('File read error'));

      const res = await request(app).get(`/api/products/${mockProduct.id}`);
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      // Mock de la lectura del archivo
      fs.promises.readFile.mockResolvedValue(
        JSON.stringify({
          products: [mockProduct],
        })
      );

      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toEqual(mockProduct);
    });

    it('should handle file read errors', async () => {
      // Mock de error en la lectura del archivo
      fs.promises.readFile.mockRejectedValue(new Error('File read error'));

      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error');
    });
  });
}); 