# Spec 01 · Plantas y riegos

Esta especificación cubre HU-1.1 y HU-1.3, tomadas del sprint actual. No implementa otras historias ni añade comportamiento fuera de alcance.

## 1. Modelos

### Planta

| Campo | Regla |
|---|---|
| nombre | Obligatorio, texto no vacío. |
| especie | Obligatoria, texto no vacío. |
| ubicacion | Obligatoria, texto no vacío. |
| intervaloRiegoDias | Obligatorio, entero mayor o igual que 1. |
| enReposo | Booleano, falso por defecto. |
| cuidadosEspeciales | Lista embebida de objetos con `tipo` y `nota`. |
| createdAt | Fecha de registro, asignada automáticamente. |

Una planta nunca regada comienza el cálculo desde `createdAt`.

### Riego

| Campo | Regla |
|---|---|
| planta | Referencia obligatoria a una planta existente. |
| fecha | Fecha del riego; por defecto, la fecha actual. No puede ser futura. |
| cantidadMl | Número mayor que cero. |
| cuidador | Texto obligatorio que identifica al cuidador que registró el riego. |

Si existen varios riegos de una planta, el más reciente se determina por su fecha y, ante la misma fecha, por el orden temporal registrado.

## 2. Contrato de los endpoints

Los cuerpos y respuestas se describen sin requerir tecnologías concretas. Las respuestas de error usan un mensaje comprensible para el cuidador.

### POST /api/plantas

- **Cuerpo:** nombre, especie, ubicacion, intervaloRiegoDias, opcionalmente enReposo y cuidadosEspeciales.
- **Respuesta válida:** datos de la planta registrada, incluido `createdAt`.
- **400:** falta algún dato obligatorio, el intervalo no es entero o es menor que 1, o el formato recibido no cumple las reglas del modelo.

### GET /api/plantas

- **Cuerpo:** ninguno.
- **Respuesta válida:** listado de las plantas registradas con sus datos.
- **400:** los parámetros opcionales de consulta no cumplen el formato permitido.
- **404:** no aplica a una colección existente; se reserva para una ruta no encontrada que no sea una planta válida.

### POST /api/riegos

- **Cuerpo:** planta, fecha opcional, cantidadMl y cuidador.
- **Respuesta válida:** datos del riego registrado y asociación a la planta existente.
- **400:** falta información obligatoria, la planta existe pero la fecha es futura o la cantidadMl no es mayor que cero.
- **404:** la planta referenciada no existe.

### GET /api/plantas/:id/riegos

- **Cuerpo:** ninguno.
- **Respuesta válida:** historial de riegos de la planta ordenado del más reciente al más antiguo.
- **400:** el identificador de planta tiene un formato inválido.
- **404:** no existe una planta con el identificador indicado.

## 3. Criterios de aceptación

### HU-1.1 · Registrar una planta

- **DEBE:** Registrar una planta válida con nombre, especie, ubicacion y intervaloRiegoDias y hacerla disponible para consulta desde su fecha de registro.
- **DEBE:** Iniciar el conteo de una planta nunca regada desde su fecha de registro.
- **DEBE:** Aceptar intervalos de riego enteros iguales o mayores que 1.
- **DEBE:** Establecer enReposo en falso cuando no se indique expresamente.
- **DEBE:** Rechazar el registro si falta nombre, especie, ubicacion o intervaloRiegoDias.
- **NO DEBE:** Registrar una planta cuyo intervalo sea menor que 1, decimal, negativo, vacío o tenga otro formato inválido.

### HU-1.3 · Registrar un riego

- **DEBE:** Registrar un riego asociado a una planta existente.
- **DEBE:** Permitir registrar la fecha actual o una fecha pasada para un riego olvidado.
- **DEBE:** Usar la fecha actual cuando no se indique una fecha.
- **DEBE:** Rechazar una fecha futura.
- **DEBE:** Rechazar una cantidadMl menor o igual que cero.
- **DEBE:** Considerar más reciente el riego cuya fecha cronológica sea posterior.
- **NO DEBE:** Registrar un riego para una planta inexistente.
- **NO DEBE:** Registrar un riego sin identificar al cuidador responsable ni con una cantidad inválida.

## 4. Criterio → verificación

| Criterio | Verificación |
|---|---|
| Plantas válidas quedan disponibles para consulta | Prueba manual con curl sobre POST y GET /api/plantas. |
| Una planta nunca regada cuenta desde su fecha de registro | Prueba manual con curl y comparación con la fecha devuelta al registrar la planta. |
| El intervalo es entero y mayor o igual que 1 | Test automático de validación del modelo, sin base de datos. |
| EnReposo es falso por defecto | Test automático de validación del modelo, sin base de datos. |
| Falta un dato obligatorio en Planta | Test automático de validación del modelo, sin base de datos; además prueba manual con curl para confirmar la respuesta 400. |
| Nombre, especie, ubicacion o intervalo vacío es inválido | Test automático de validación del modelo, sin base de datos. |
| Riego válido queda asociado a una planta existente | Prueba manual con curl sobre POST /api/riegos y GET /api/plantas/:id/riegos. |
| La fecha omitida toma la fecha actual | Test automático de validación del modelo, sin base de datos. |
| Fechas futuras, pasadas y actuales | Prueba manual con curl y test automático de validación del modelo para la regla de fecha futura. |
| CantidadMl mayor que cero | Test automático de validación del modelo, sin base de datos. |
| Planta inexistente | Prueba manual con curl; la respuesta debe indicar 404. |
| Cuidador obligatorio | Test automático de validación del modelo, sin base de datos. |
| Último riego entre varios registros | Prueba manual con curl mostrando el historial y verificando el orden; o test automático de comparación de fechas sin base de datos. |

## 5. Ticket → archivos

| Ticket | Archivos que crea o modifica |
|---|---|
| T-01 | `package.json`, `src/app.js`, `src/index.js`, `src/models/`, `src/routes/` |
| T-02 | `src/models/planta.model.js`, `src/dominio/plantas.js` |
| T-03 | `src/routes/plantas.routes.js`, `src/app.js` |
| T-04 | `test/models/planta.test.js`, `test/routes/plantas.test.js` |
| T-05 | `src/models/riego.model.js`, `src/routes/riegos.routes.js`, `src/models/planta.model.js` |
| T-06 | `src/dominio/riegos.js`, `src/models/riego.model.js` |
| T-07 | `src/routes/riegos.routes.js`, `src/routes/plantas.routes.js`, `src/app.js` |
| T-08 | `test/models/riego.test.js`, `test/routes/riegos.test.js`, `test/routes/plantas-riegos.test.js` |
