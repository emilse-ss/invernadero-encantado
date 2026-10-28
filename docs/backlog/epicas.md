# Épicas del MVP

## E1 · Plantas y riegos

**Objetivo:** Registrar y consultar las plantas junto con sus intervalos y el historial de sus riegos.

**Puntos del alcance cubiertos:**
- Punto 1: registrar plantas y consultar sus necesidades de riego.
- Punto 2: definir para cada planta un intervalo de riego entero de al menos 1 día.
- Punto 3: registrar riegos con una fecha no futura, incluidas fechas pasadas.

**Reglas de negocio aplicables:**
- Una planta nunca regada cuenta desde su fecha de registro.
- El intervalo de riego debe ser un número entero de días igual o superior a 1.
- Un riego registrado no puede tener fecha futura, pero sí puede ser pasado para corregir un riego olvidado.
- Si existen varios riegos, el cálculo usa el más reciente.

## E2 · Cuidado

**Objetivo:** Determinar qué plantas necesitan agua y gestionar su periodo de reposo hasta el próximo riego.

**Puntos del alcance cubiertos:**
- Punto 1: consultar la lista de necesidades de riego, compartido con E1.
- Punto 2: usar el intervalo definido para cada planta y considerar su mínimo de 1 día.
- Punto 4: determinar si una planta necesita agua con el riego más reciente o con la fecha de registro si nunca fue regada.

**Reglas de negocio aplicables:**
- Una planta nunca regada cuenta desde su fecha de registro.
- El intervalo de riego debe ser un número entero de días igual o superior a 1.
- Si existen varios riegos, el cálculo usa el más reciente.

## Cobertura del alcance
Ningún punto del alcance del PRD quedó fuera: los puntos 1 y 2 se comparten entre ambas épicas, el punto 3 corresponde a E1 y el punto 4 corresponde a E2.
