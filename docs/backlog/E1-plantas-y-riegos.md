# E1 · Plantas y riegos

## HU-1.1 · Registrar una planta
Como cuidador, quiero registrar una planta con su nombre y su intervalo de riego, para incorporarla al control del invernadero desde su fecha de registro.

### Criterios de aceptación
- DADO una planta nueva con un intervalo válido; CUANDO el cuidador la registra; ENTONCES la planta queda disponible para consultar y el cálculo comienza desde su fecha de registro.
- DADO una planta nueva con un intervalo de 1 o más días; CUANDO el cuidador la registra; ENTONCES el intervalo queda asociado a la planta.
- DADO una planta nueva con un intervalo menor que 1 día o no entero; CUANDO el cuidador intenta registrarla; ENTONCES la planta no se registra y el cuidado conserva únicamente intervalos válidos.
- DADO una planta nueva a la que le falta el nombre, la especie, la ubicación o el intervalo; CUANDO el cuidador intenta registrarla; ENTONCES la planta no se registra hasta completar esos datos obligatorios.

**Reglas del PRD aplicables:** una planta nunca regada cuenta desde su fecha de registro; el intervalo de riego debe ser un número entero de días igual o superior a 1.

### Casos borde propuestos
- Registrar dos plantas con el mismo nombre.
- Introducir el intervalo con decimales, texto, cero, un número negativo o un valor vacío.
- Confirmar si la fecha de registro se toma con fecha y hora o solamente con el día.

## HU-1.3 · Registrar un riego
Como cuidador, quiero registrar un riego de una planta con su fecha real, para mantener actualizado cuándo debe volver a necesitar agua.

### Criterios de aceptación
- DADO una planta registrada y un riego realizado hoy o en una fecha pasada; CUANDO el cuidador registra su fecha; ENTONCES el riego queda asociado a esa planta y puede consultarse como parte de su historial.
- DADO una planta registrada con un riego realizado en una fecha pasada olvidada; CUANDO el cuidador registra esa fecha; ENTONCES el sistema acepta el riego sin exigir que haya sido registrado ese mismo día.
- DADO un riego cuya fecha es futura; CUANDO el cuidador intenta registrarlo; ENTONCES el riego no se registra.
- DADO una planta con varios riegos; CUANDO se determina cuál fue el último; ENTONCES se considera el riego con la fecha más reciente.
- DADO el riego de una planta que no existe; CUANDO el cuidador intenta registrarlo; ENTONCES el riego no se registra.
- DADO un riego con una cantidad de agua menor o igual que cero; CUANDO el cuidador intenta registrarlo; ENTONCES el riego no se registra.

**Reglas del PRD aplicables:** un riego registrado no puede tener fecha futura, sí puede tener fecha pasada para registrar uno olvidado; si existen varios riegos, cuenta el más reciente; una planta nunca regada cuenta desde su fecha de registro.

### Casos borde propuestos
- Registrar un riego con una fecha anterior a la fecha de registro de la planta.
- Registrar varios riegos con la misma fecha.
- Registrar dos riegos cuya fecha más reciente aparece empatada por día pero difiere por hora.
- Interpretar la fecha futura o actual según la zona horaria del cuidador.

## HU-1.2 · Consultar las plantas registradas
Como cuidador, quiero consultar las plantas registradas, para revisar qué plantas forman parte del invernadero y cuáles son sus intervalos de riego.

**Estado:** por refinar.

## HU-1.5 · Consultar el historial de riegos
Como cuidador, quiero consultar los riegos registrados de una planta, para conocer cuándo fue atendida anteriormente y cuál fue el riego más reciente.

**Estado:** por refinar.

## HU-1.6 · Rechazar un intervalo inválido
Como cuidador, quiero impedir intervalos de riego que no sean números enteros de días o menores que 1, para que el cálculo del cuidado tenga datos válidos.

**Estado:** por refinar.

## HU-1.7 · Consultar el estado de los riegos
Como cuidador, quiero consultar qué plantas necesitan riego y cuáles pueden esperar, para priorizar el cuidado diario del invernadero.

**Estado:** por refinar.

## Tickets del sprint

### HU-1.1 · Registrar una planta

#### T-01 · Preparar la estructura de planta
- **Tipo:** Configuración.
- **Descripción:** Preparar la organización técnica de la capa de modelos y rutas necesaria para comenzar el registro de plantas, sin implementar todavía el comportamiento completo.
- **Definition of Done:**
  - [ ] La estructura prevista para plantas está disponible.
  - [ ] Las dependencias necesarias están configuradas.
  - [ ] La configuración no introduce credenciales ni datos sensibles.
- **Dependencias:** ninguna.

#### T-02 · Definir las reglas de una planta
- **Tipo:** Modelo/Dominio.
- **Descripción:** Aplicar las reglas de datos obligatorios, intervalo entero mínimo de un día y fecha inicial desde la que cuenta una planta nunca regada.
- **Definition of Done:**
  - [ ] Nombre, especie, ubicación e intervalo son obligatorios.
  - [ ] Solo se aceptan intervalos enteros iguales o mayores que uno.
  - [ ] Una planta nunca regada conserva su fecha de registro como inicio del cálculo.
- **Dependencias:** T-01.

#### T-03 · Exponer el registro de plantas
- **Tipo:** Endpoint/API.
- **Descripción:** Permitir que el cuidador registre una planta y obtener su confirmación o la indicación visible de por qué el registro no fue aceptado.
- **Definition of Done:**
  - [ ] Una planta válida queda registrada.
  - [ ] Los datos obligatorios ausentes impiden el registro.
  - [ ] Un intervalo inválido impide el registro.
- **Dependencias:** T-02.

#### T-04 · Comprobar el registro de plantas
- **Tipo:** Test.
- **Descripción:** Cubrir los casos válidos y rechazados de registro de plantas desde la perspectiva del cuidador.
- **Definition of Done:**
  - [ ] Hay pruebas para una planta válida.
  - [ ] Hay pruebas para cada dato obligatorio ausente.
  - [ ] Hay pruebas para intervalos menores que uno, decimales, negativos y vacíos.
  - [ ] Las pruebas pasan con el resto del proyecto.
- **Dependencias:** T-03.

### HU-1.3 · Registrar un riego

#### T-05 · Preparar la estructura de riegos
- **Tipo:** Configuración.
- **Descripción:** Preparar la organización técnica de la capa de modelos y rutas necesaria para registrar riegos y conectarlos con plantas existentes.
- **Definition of Done:**
  - [ ] La estructura prevista para riegos está disponible.
  - [ ] La estructura distingue una planta existente de una inexistente.
  - [ ] No se introducen credenciales ni datos sensibles.
- **Dependencias:** T-01.

#### T-06 · Definir las reglas de un riego
- **Tipo:** Modelo/Dominio.
- **Descripción:** Aplicar las reglas sobre planta existente, fecha pasada o actual, prohibición de fechas futuras, cantidad mayor que cero y selección del riego más reciente.
- **Definition of Done:**
  - [ ] Solo se acepta una planta existente.
  - [ ] Solo se aceptan cantidades de agua mayores que cero.
  - [ ] No se aceptan fechas futuras.
  - [ ] Entre varios riegos se reconoce el más reciente.
- **Dependencias:** T-02 y T-05.

#### T-07 · Exponer el registro de riegos
- **Tipo:** Endpoint/API.
- **Descripción:** Permitir que el cuidador registre un riego válido y recibir una indicación visible cuando la planta no exista o los datos sean inválidos.
- **Definition of Done:**
  - [ ] Un riego válido queda asociado a una planta existente.
  - [ ] Un riego pasado olvidado queda registrado correctamente.
  - [ ] Las fechas futuras y las cantidades no positivas impiden el registro.
- **Dependencias:** T-06.

#### T-08 · Comprobar el registro de riegos
- **Tipo:** Test.
- **Descripción:** Validar el registro de riegos desde la perspectiva del cuidador, incluidos los casos de planta inexistente, fechas futuras y cantidades no válidas.
- **Definition of Done:**
  - [ ] Hay pruebas para riegos actuales y pasados válidos.
  - [ ] Hay pruebas para planta inexistente, fecha futura y cantidad cero o negativa.
  - [ ] Hay pruebas para elegir el riego más reciente entre varios registros.
  - [ ] Las pruebas pasan con el resto del proyecto.
- **Dependencias:** T-07.

### Orden de ejecución sugerido
1. T-01 · Preparar la estructura de planta.
2. T-02 · Definir las reglas de una planta.
3. T-03 · Exponer el registro de plantas.
4. T-04 · Comprobar el registro de plantas.
5. T-05 · Preparar la estructura de riegos.
6. T-06 · Definir las reglas de un riego.
7. T-07 · Exponer el registro de riegos.
8. T-08 · Comprobar el registro de riegos.

## FUERA DE ALCANCE

### HU-1.8 · Recibir avisos automáticos de riego
Como cuidador, quiero recibir avisos automáticos cuando una planta necesite agua, para actuar sin revisar manualmente el estado del invernadero.

**Estado:** fuera de alcance. Esta capacidad corresponde a los avisos automáticos excluidos expresamente por el no-alcance del MVP.

### HU-1.9 · Automatizar el riego de las plantas
Como cuidador, quiero activar el riego físico desde el sistema, para mantener las plantas sin intervenir manualmente.

**Estado:** fuera de alcance. La automatización física del riego está excluida expresamente por el no-alcance del MVP.
