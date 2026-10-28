# PRD MVP: El Invernadero Encantado

## 1. Problema
Los cuidadores necesitan saber qué plantas requieren agua y cuáles pueden esperar, pero no siempre llevan un control fiable de cada riego ni de cuánto tiempo ha pasado desde el último.

## 2. Usuarios
Cuidadores responsables de registrar plantas, consultar su necesidad de agua y mantener el historial de riegos del invernadero.

## 3. Objetivo y métrica de éxito
Permitir una priorización sencilla de las plantas que necesitan riego. Como métrica inicial, al menos el 90 % de las plantas debe mostrar correctamente si necesita agua según su intervalo y su último riego registrado.

## 4. Alcance del MVP
1. Registrar plantas y consultar la lista de necesidades de riego.
2. Definir para cada planta un intervalo de riego de días completo, con un mínimo de 1.
3. Registrar riegos con una fecha no futura, incluyendo fechas pasadas.
4. Determinar si una planta necesita agua usando el riego más reciente o, si nunca fue regada, su fecha de registro.

## 5. No-alcance
Informes avanzados, avisos automáticos, integración con sensores o sistemas externos, gestión de cuidadores y automatización física del riego.

## 6. Reglas de negocio
- Una planta nunca regada cuenta desde su fecha de registro.
- El intervalo de riego debe ser un número entero de días igual o superior a 1.
- Un riego registrado debe tener una fecha que no sea futura. Se permiten fechas pasadas para corregir registros olvidados.
- Si existen varios riegos, el cálculo usa el más reciente.

## 7. Supuestos, marcados con [SUPUESTO]
- [SUPUESTO] Una planta necesita agua cuando la fecha actual alcanza o supera la fecha esperada de su próximo riego.
- [SUPUESTO] Las fechas se interpretan con una única zona horaria común para todos los cuidadores.
- [SUPUESTO] Los cuidadores registrarán cada riego con suficiente detalle para identificar cuál ocurrió más recientemente.

## 8. Puntos abiertos
- Confirmar cómo se comportará el cálculo cuando hayan transcurrido exactamente los días del intervalo.
- Definir si se aceptan varios riegos para una misma fecha y cómo se determina el más reciente dentro de ese día.
- Acordar qué zona horaria se utilizará y si será configurable.
- Precisar si un riego pasado puede ser anterior a la fecha de registro de la planta.
