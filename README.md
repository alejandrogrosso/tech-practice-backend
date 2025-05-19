# Tech Practice Backend

Este backend simula una API RESTful para una página de detalle de producto.
Está construido con Node.js y Express, y utiliza archivos JSON locales para persistencia.

- **Stack:** Node.js, Express
- **Persistencia:** Archivos JSON locales
- **Tests:** Jest, Supertest
- **Propósito:** Prototipo de backend para práctica técnica.

Para instrucciones de instalación, ejecución y pruebas, consulta el archivo `run.md` en esta misma carpeta.

## Estructura de carpetas principal
```
tech-practice-backend/
├── __tests__/           # Tests en la raíz (convención de Jest)
├── src/
│   ├── app.js            # Configuración principal de Express
│   ├── server.js         # Punto de entrada
│   ├── routes/           # Rutas de productos
│   ├── controllers/      # Lógica de negocio
│   ├── models/           # Acceso a datos
│   ├── data/             # Datos en JSON
│   ├── middlewares/      # Manejo de errores
│   └── helpers/          # Utilidades y funciones auxiliares
└── ...
```
 