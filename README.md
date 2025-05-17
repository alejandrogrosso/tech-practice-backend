# API Backend - Detalle de Producto (Estilo MercadoLibre)

Este proyecto implementa una API REST que simula el endpoint de detalle de producto de MercadoLibre.

## Requisitos

- Node.js (v14 o superior)
- npm

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```

## Ejecución

Para desarrollo (con hot reload):
```bash
npm run dev
```

Para producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints

### GET /api/products
Retorna la lista de todos los productos disponibles.

### GET /api/products/:id
Retorna los detalles de un producto específico.

Ejemplo de respuesta:
```json
{
  "id": "MLB1234567",
  "title": "iPhone 13 Pro Max 256GB - Grafito",
  "price": 999999.99,
  "original_price": 1099999.99,
  "currency_id": "ARS",
  "condition": "new",
  "thumbnail": "...",
  "pictures": [...],
  "seller": {...},
  "shipping": {...},
  "attributes": [...],
  "warranty": "..."
}
```

## Dificultades y Soluciones

1. **Almacenamiento de Datos**: 
   - Desafío: No poder usar bases de datos reales.
   - Solución: Implementación de un sistema de almacenamiento basado en archivos JSON locales, que permite una estructura de datos rica y fácil de mantener.

2. **Estructura de Datos**: 
   - Desafío: Replicar la estructura de datos compleja de MercadoLibre.
   - Solución: Análisis de la API real de MercadoLibre para crear un modelo de datos simplificado pero representativo.

3. **Manejo de Errores**:
   - Desafío: Gestión robusta de errores para diferentes escenarios.
   - Solución: Implementación de un sistema de manejo de errores centralizado con respuestas HTTP apropiadas.

## Mejoras Futuras

- Implementar caché para mejorar el rendimiento
- Agregar validación de datos más robusta
- Implementar sistema de búsqueda y filtros
- Agregar más endpoints para una experiencia más completa 