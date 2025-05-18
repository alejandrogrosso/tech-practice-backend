# Tech Practice Backend – Mercado Libre Product Detail API

Este backend simula una API RESTful para una página de detalle de producto al estilo Mercado Libre. Está construido con Node.js y Express, y ahora tiene una estructura profesional y escalable.

## 📁 Estructura de carpetas

```
src/
├── app.js                  # Configuración principal de la app Express
├── server.js               # Punto de entrada (levanta el servidor)
├── routes/
│   └── products.js         # Rutas de productos
├── controllers/
│   └── productsController.js # Lógica de negocio de productos
├── models/
│   └── productModel.js     # Acceso a datos de productos
├── data/
│   └── products.json       # Datos de productos
├── middlewares/
│   └── errorHandler.js     # Middleware de manejo de errores
└── ...
```

## 🚀 Cómo ejecutar

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea un archivo `.env` con:
   ```
   PORT=3001
   CORS_ORIGIN=http://localhost:3000
   ```
3. Ejecuta el servidor:
   ```bash
   npm start
   # o
   node src/server.js
   ```

## 🛠️ Endpoints principales

- `GET /api/products` – Lista todos los productos
- `GET /api/products/:id` – Detalle de un producto (incluye imágenes, precio, vendedor, métodos de pago, stock, calificaciones, relacionados, etc.)
- `GET /api/health` – Healthcheck

## 📝 Notas
- El backend lee los datos desde un archivo JSON (no hay base de datos real).
- La estructura es fácilmente escalable para agregar nuevas entidades, autenticación, etc.

---

¡Listo para usarse como backend de pruebas para el frontend de Mercado Libre!

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