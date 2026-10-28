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

## FUERA DE ALCANCE

### HU-1.8 · Recibir avisos automáticos de riego
Como cuidador, quiero recibir avisos automáticos cuando una planta necesite agua, para actuar sin revisar manualmente el estado del invernadero.

**Estado:** fuera de alcance. Esta capacidad corresponde a los avisos automáticos excluidos expresamente por el no-alcance del MVP.

### HU-1.9 · Automatizar el riego de las plantas
Como cuidador, quiero activar el riego físico desde el sistema, para mantener las plantas sin intervenir manualmente.

**Estado:** fuera de alcance. La automatización física del riego está excluida expresamente por el no-alcance del MVP.
