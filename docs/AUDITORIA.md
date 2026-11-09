# Auditoría de la spec 01 · Plantas y riegos

## Resumen

`npm test` terminó con **11 pruebas aprobadas y 0 fallidas**. También se hicieron verificaciones con `curl` contra `http://localhost:3000` y validación directa de los modelos Mongoose sin conectarse a una base de datos. No se modificó código.

| Criterio | Cómo se verificó | Resultado | Evidencia |
|---|---|---|---|
| Planta: nombre, especie, ubicación e intervalo obligatorios | Test automático y validación Mongoose sin base de datos | cumple | `test/models/planta.test.js` comprueba cada dato ausente mediante `validarPlanta`; Mongoose rechaza `nombre` ausente. |
| Planta: intervalo entero ≥ 1 | Test automático, validación Mongoose sin base de datos y curl | cumple | Tests rechazan 0, negativos, decimal y texto; Mongoose rechaza 0 y 1.5; `POST /api/plantas` con intervalo 0 devolvió 400. |
| Planta: `enReposo` es falso por defecto | Test automático y validación Mongoose sin base de datos | cumple | `test/models/planta.test.js` y la comprobación directa del modelo observaron `false`. |
| Planta: `cuidadosEspeciales` embebidos con tipo y nota | Inspección del modelo y validación Mongoose sin base de datos | cumple | `src/models/planta.model.js` define el subdocumento; una lista con `tipo` y `nota` pasó la validación. |
| Planta: `createdAt` se asigna al registrar | Validación Mongoose sin base de datos y curl | cumple | El modelo asigna fecha por defecto; la creación válida devolvió `createdAt`. |
| Planta nunca regada inicia el cálculo desde su fecha de registro | Inspección de implementación | no cumple | Se asigna `createdAt`, pero no hay una función de cálculo de necesidad de riego que la use como fecha inicial. |
| POST `/api/plantas`: alta válida disponible para consulta | Test automático y curl | cumple | `POST` devolvió 201; `GET /api/plantas` devolvió 200 e incluyó plantas. |
| POST `/api/plantas`: rechaza datos requeridos ausentes e intervalos inválidos con 400 | Test automático y curl | cumple | `test/routes/plantas.test.js` verifica 400 por intervalo ausente; `POST` con intervalo 0 devolvió 400. El validador unitario cubre todos los campos obligatorios. |
| GET `/api/plantas`: lista plantas | Test automático y curl | cumple | `test/routes/plantas.test.js` recibió 200; curl recibió 200 y una lista con 2 plantas. |
| GET `/api/plantas`: parámetros inválidos con 400 | Inspección y prueba | sin verificar | La spec menciona parámetros opcionales, pero no define ninguno y la ruta no implementa filtros. |
| Riego: referencia a planta y campos requeridos | Inspección de modelo, test automático y validación Mongoose sin base de datos | cumple | `riego.model.js` define la referencia y `cantidadMl`/`cuidador` requeridos; el modelo rechaza cuidador ausente. |
| Riego: fecha actual por defecto | Test automático y validación Mongoose sin base de datos | cumple | El modelo usa `Date.now`; `validarRiego` usa la hora actual cuando no se proporciona fecha. |
| Riego: cantidad mayor que cero | Test automático, validación Mongoose sin base de datos y curl | cumple | Los tests rechazan cero; Mongoose rechaza cero; curl con `cantidadMl: 0` devolvió 400. |
| Riego: permitir fecha actual o pasada y rechazar fecha futura | Test automático, validación Mongoose sin base de datos y curl | cumple | El test de dominio acepta fecha pasada; el modelo rechaza fecha futura; curl con fecha futura devolvió 400 y un riego sin fecha devolvió 201. |
| Riego: cuidador obligatorio | Test automático y validación Mongoose sin base de datos | cumple | El dominio exige cuidador y la validación Mongoose rechaza `cuidador` ausente. |
| Riego: asociarlo solo a una planta existente | Test automático y curl | cumple | La prueba de ruta y curl con identificador inexistente recibieron 404; el alta válida recibió 201. |
| POST `/api/riegos`: errores de validación 400 y planta inexistente 404 | Test automático y curl | cumple | Curl observó 400 para fecha futura y cantidad 0, y 404 para planta inexistente. |
| GET `/api/plantas/:id/riegos`: historial de planta existente | Test automático y curl | cumple | La prueba de ruta recibió 200; curl recibió 200 y devolvió 1 riego. |
| GET historial: identificador mal formado 400 y planta desconocida 404 | Inspección y prueba | sin verificar | La ruta contiene ambas ramas, pero no se ejecutaron pruebas para esos dos casos. |
| Riegos múltiples: elegir la fecha más reciente y ordenar el historial descendentemente | Test automático e inspección de la ruta | cumple | `test/models/riego.test.js` comprueba la selección por fecha; la ruta ordena el historial descendentemente. |
| Riegos con la misma fecha: decidir por orden temporal de registro | Inspección de implementación | no cumple | La comparación ordena solo por `fecha`; en un empate conserva el orden original y no prioriza explícitamente el registro más reciente. |
| Persistencia de plantas y riegos entre reinicios | Inspección de implementación | no cumple | Las rutas guardan en arreglos en memoria (`store.plantas` y `store.riegos`); los modelos Mongoose no son usados por las rutas, por lo que los datos se pierden al reiniciar. |
| Repositorio de tests | `npm test` | cumple | 11 tests pasaron; 0 fallaron. |

## Observaciones

- Los archivos de test bajo `test/models/` prueban principalmente funciones de dominio; no validan por sí mismos los esquemas Mongoose. Las verificaciones de esquema indicadas arriba fueron ejecutadas directamente, sin base de datos, y no forman todavía parte de `npm test`.
- Las rutas usan almacenamiento en memoria. Aunque las verificaciones HTTP de esta auditoría pasaron, los modelos Mongoose no proporcionan persistencia en los endpoints.
- La spec no define filtros para `GET /api/plantas` ni una regla de desempate para riegos con idéntica fecha.
