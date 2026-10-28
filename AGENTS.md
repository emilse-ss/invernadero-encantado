# AGENTS.md

## Proyecto
API REST para registrar las plantas mágicas de un invernadero y sus riegos.

## Stack
Node.js 20+, Express 5, Mongoose 8, CommonJS (`require`), tests con `node --test` y formato con Prettier.

## Estructura prevista
- `src/app.js`
- `src/index.js`
- `src/models/`
- `src/routes/`
- `src/dominio/` — funciones puras
- `test/`
- `docs/prd/`
- `docs/specs/`

## Comandos
- Desarrollo: `npm run dev`
- Pruebas: `npm test`

## Convenciones
Nombres del dominio en español, camelCase y rutas REST bajo `/api`.

## Reglas
- Nunca leer ni modificar `.env`.
- Nunca escribir credenciales en el código.
- Ninguna funcionalidad se implementa sin una spec en `docs/specs`.
- Ejecutar `npm test` antes de dar una tarea por terminada.
