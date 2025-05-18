# Tech Practice Backend

Este backend simula una API RESTful para una página de detalle de producto al estilo Mercado Libre. Está construido con Node.js y Express, y utiliza archivos JSON locales para persistencia.

- **Stack:** Node.js, Express
- **Persistencia:** Archivos JSON locales
- **Tests:** Jest, Supertest
- **Propósito:** Prototipo de backend para práctica técnica.

Para instrucciones de instalación, ejecución y pruebas, consulta el archivo `run.md` en esta misma carpeta.

## Instalación

1. Clona el repositorio y entra a esta carpeta:
   ```bash
   git clone <REPO_URL>
   cd tech-practice-backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Variables de entorno
Crea un archivo `.env` en la raíz de esta carpeta con el siguiente contenido:
```
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## Ejecución en desarrollo
```bash
npm run dev
```
El backend estará disponible en: http://localhost:3001

## Tests y cobertura
```bash
npm test
```

## Build de producción
```bash
npm run build
npm start
```

## Estructura de carpetas principal
```
tech-practice-backend/
├── src/
│   ├── app.js            # Configuración principal de Express
│   ├── server.js         # Punto de entrada
│   ├── routes/           # Rutas de productos
│   ├── controllers/      # Lógica de negocio
│   ├── models/           # Acceso a datos
│   ├── data/             # Datos en JSON
│   └── middlewares/      # Manejo de errores
└── ...
```

## Decisiones de diseño y desafíos
- **Estructura profesional:** Separación en rutas, controladores, modelos y middlewares.
- **Persistencia:** Uso de archivos JSON para simular una base de datos.
- **Manejo de errores:** Middleware centralizado para respuestas consistentes.
- **Cobertura:** Se priorizó la cobertura de tests (>80%) usando Jest y Supertest.
- **Desafíos:** Simular una API realista y robusta sin base de datos real.

---

¡Listo! Este backend puede ejecutarse y testearse de forma completamente independiente. 