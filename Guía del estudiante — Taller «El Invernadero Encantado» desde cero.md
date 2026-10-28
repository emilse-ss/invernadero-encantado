# Guía del estudiante — Taller «El Invernadero Encantado» desde cero

Desarrollo Web 3 · Semana 11 · Clase 2 · 80 minutos · Oct 27, 2026 · @Andres

## Qué vas a construir y cómo usar esta guía

Partes de una **carpeta vacía** y terminas con la API del "Invernadero Encantado" del Departamento de Parques de Pawnee publicada en tu GitHub. Por el camino recorres la cadena completa de **Spec-Driven Development**: de una idea de producto a código validado.

**El embudo de hoy:** cada nivel se descompone solo en lo que el sprint necesita.

| Nivel | Qué es | Cuánto haces hoy | Archivo |
| --- | --- | --- | --- |
| PRD | El problema, los usuarios, el alcance y las reglas de negocio. Sin tecnología | Completo (mini-PRD) | `docs/prd/invernadero-mvp.md` |
| Épicas | Grandes bloques de valor que agrupan el alcance | Las 2 del MVP | `docs/backlog/epicas.md` |
| Historias | "Como / quiero / para": algo que un usuario puede ver terminado | Las de la épica E1 | `docs/backlog/E1-plantas-y-riegos.md` |
| Criterios | Reglas comprobables DADO / CUANDO / ENTONCES | Las 2 historias del sprint | mismo archivo |
| Tickets | Unidades de trabajo con tipo, Definition of Done y dependencias | Las 2 historias del sprint | mismo archivo |
| Spec | El cómo técnico: modelos, endpoints, errores y cómo se verifica | 1 spec | `docs/specs/01-plantas-y-riegos.md` |
| Código | La implementación, en el orden de los tickets | La spec 01 | `src/`, `test/` |

Las dos historias del sprint son **registrar una planta** y **registrar un riego**. Todo se trabaja en git local; solo al final se sube a un repositorio remoto.

### Convenciones de esta guía

- **Los bloques de prompt se pegan tal cual** en Claude Code. Si el bloque tiene una parte entre corchetes, como `[pegar aquí…]`, la reemplazas por lo que indica.
- **Las líneas que empiezan con `!`** también se escriben en Claude Code. El `!` ejecuta el comando de shell directamente, sin pasar por la IA.
- **Las líneas que empiezan con `/`** son comandos de Claude Code: `/commit`, `/hooks`, `/context`…
- **Los bloques `bash`** se escriben en una terminal normal, fuera de Claude Code.
- **`Shift+Tab`** cambia el modo de Claude Code: normal → aceptar ediciones → **plan mode**. En plan mode la IA piensa y propone, pero **no puede modificar archivos**. El modo activo se ve debajo del cuadro de texto.
- **Al final de cada paso** hay un recuadro ✅ con lo que deberías tener. Si no coincide, ve a "Cómo retomar si te perdiste".
- **Las respuestas de la IA varían** entre personas. Lo que no cambia son los prompts, los nombres de archivo y las decisiones del cliente.

### Tres reglas del taller

1. **Ninguna credencial en el chat, en el repo ni en pantalla.** Tu cadena de MongoDB vive solo en `.env`, y la escribes en tu editor.
2. **Ningún código sin su spec.** Si la IA empieza a programar antes de tiempo, deténla con `Esc`.
3. **La IA propone; tú decides.** Las decisiones de producto las toma el cliente, y quedan escritas en `docs/`.

## Ficha de hechos del cliente

Estas son las respuestas del cliente. Las pegas completas en el paso 2a. **No inventes producto**: si algo no está aquí, es un supuesto o una pregunta para el cliente.

```text
FICHA DE HECHOS — INVERNADERO ENCANTADO (Departamento de Parques de Pawnee)

- Quién lo usa: de 3 a 5 cuidadores voluntarios del invernadero. Todos tienen el mismo permiso.
- Problema: las plantas mágicas se marchitan porque nadie recuerda cuándo se regó cada una. Hoy se usa una libreta.
- Qué quieren: registrar cada planta y cada riego, y consultar en cualquier momento qué plantas necesitan agua.
- Regla del cliente: cada planta tiene su propio intervalo de riego en días. Si pasó más tiempo que ese intervalo desde el último riego, la planta tiene sed.
- Reposo: algunas plantas entran en reposo (hibernan) y no deben regarse mientras duren así.
- Éxito: en un mes, cero plantas marchitas por olvido.
- Comodín de NO-alcance: notificaciones, fotos, usuarios y roles, clima, sensores IoT, interfaz web o app móvil quedan fuera del MVP.
```

**Comodín de no-alcance.** Si la IA propone algo de esa lista, o cualquier otra cosa que el cliente no pidió, respóndele: *"Fuera del MVP. Anótalo como no-alcance."*

## Paso a paso del taller

| Min | Paso | Archivo que produce | Commit |
| --- | --- | --- | --- |
| 0–5 | 0 · Carpeta vacía y `git init` | repo local | — |
| 5–15 | 1 · Harness y skill `/commit` | `AGENTS.md`, `CLAUDE.md`, `.gitignore`, `.claude/skills/commit/SKILL.md` | sí |
| 15–25 | 2 · Mini-PRD | `docs/prd/invernadero-mvp.md` | sí |
| 25–33 | 3 · Épicas e historias de E1 | `docs/backlog/epicas.md`, `docs/backlog/E1-plantas-y-riegos.md` | sí |
| 33–43 | 4 · Criterios y tickets del sprint | `docs/backlog/E1-plantas-y-riegos.md` | sí |
| 43–50 | 5 · Spec 01 | `docs/specs/01-plantas-y-riegos.md` | sí |
| 50–54 | 6 · Hook de formato | `package.json`, `.claude/settings.json`, `.claude/hooks/formatear.js` | sí |
| 54–69 | 7 · Código por tickets y validación | `src/`, `test/`, `.env.example` | sí |
| 69–75 | 8 · Auditoría y cierre de tickets | `docs/AUDITORIA.md` | sí |
| 75–80 | 9 · Push | tu repo en GitHub | push |

### Paso 0 · Carpeta vacía (min 0–5)

En una terminal, en la carpeta donde guardas tus proyectos:

```bash
mkdir invernadero-encantado
cd invernadero-encantado
git init -b main
claude
```

Prueba `Shift+Tab` varias veces y observa cómo cambia el modo. Vuelve al modo normal.

> ✅ Claude Code está abierto en modo normal dentro de `invernadero-encantado`, que es un repositorio git vacío.

### Paso 1 · Harness y skill de commit (min 5–15)

**1a. Memoria del proyecto.** En una carpeta vacía no hay nada que analizar, así que el harness lo escribimos nosotros:

```text
Esta carpeta está vacía: vamos a construir desde cero la API del "Invernadero Encantado".
Crea un AGENTS.md de máximo 40 líneas con estas secciones:
- Proyecto: API REST para registrar las plantas mágicas de un invernadero y sus riegos.
- Stack: Node.js 20+, Express 5, Mongoose 8, CommonJS (require), tests con node --test, formato con Prettier.
- Estructura prevista: src/app.js, src/index.js, src/models/, src/routes/, src/dominio/ (funciones puras), test/, docs/prd/, docs/specs/.
- Comandos: npm run dev, npm test.
- Convenciones: nombres del dominio en español, camelCase, rutas REST bajo /api.
- Reglas: nunca leer ni modificar .env; nunca escribir credenciales en el código; ninguna funcionalidad se implementa sin una spec en docs/specs; ejecutar npm test antes de dar una tarea por terminada.
Crea también CLAUDE.md con una sola línea: @AGENTS.md
Y un .gitignore con node_modules/, .env y *.log.
```

Revisa que `AGENTS.md` tenga menos de 40 líneas y que `.env` esté en el `.gitignore`.

**1b. Crear la skill `/commit`.** Escribe `/` y comprueba que `/commit` todavía no existe. Luego pega:

```text
Crea una skill de proyecto llamada commit en .claude/skills/commit/SKILL.md.
Frontmatter:
- name: commit
- description: qué hace y cuándo usarla, en una frase.
- disable-model-invocation: true, para que solo se ejecute cuando yo escriba /commit.
Instrucciones en pasos numerados:
1. Leer los cambios en staging con git diff --staged.
2. Si no hay nada en staging, avisar y detenerse. Nunca hacer git add por su cuenta.
3. Si los cambios incluyen .env o algo que parezca una credencial, detenerse y avisar.
4. Escribir el mensaje en formato Conventional Commits (feat, fix, docs, test, refactor, chore), en español y con máximo 72 caracteres.
5. Mostrar el mensaje y hacer el commit. Nunca hacer push.
```

Revisa el archivo con `!cat .claude/skills/commit/SKILL.md` y compáralo con la "Referencia". Escribe `/` otra vez: ahora `/commit` debe aparecer.

**1c. Primer commit del repositorio:**

```text
!git add .
/commit
```

> ✅ Existen `AGENTS.md`, `CLAUDE.md` (una línea: `@AGENTS.md`), `.gitignore` y `.claude/skills/commit/SKILL.md`. `/commit` aparece al escribir `/` y `!git log --oneline` muestra un commit.

### Paso 2 · Mini-PRD (min 15–25)

**2a. Buscar los huecos de la ficha.** Activa **plan mode** con `Shift+Tab`:

```text
Estás en plan mode: no modifiques ningún archivo.
Actúa como un socio de producto escéptico. El cliente quiere una API para que los cuidadores sepan qué plantas necesitan agua. Estas son sus respuestas:
[pegar aquí la ficha de hechos completa]
Antes de proponer nada, señala como máximo 4 huecos o ambigüedades de la ficha que cambiarían el comportamiento del producto. Solo nivel de producto: nada de endpoints, bases de datos ni tecnologías.
```

El docente, como cliente, resolverá los huecos. Cuando anuncie las decisiones, pega:

```text
Decisiones del cliente:
- Una planta que nunca se ha regado cuenta desde su fecha de registro.
- El intervalo de riego es un número entero de días, mínimo 1.
- Un riego no puede tener fecha futura; sí puede tener fecha pasada, para registrar un riego olvidado.
- Si hay varios riegos, cuenta el más reciente.
Lo que siga sin resolver se anota como punto abierto.
```

**2b. Escribir el mini-PRD.** Sal de plan mode con `Shift+Tab` hasta el modo normal:

```text
Escribe docs/prd/invernadero-mvp.md, un mini-PRD de máximo una página con estas secciones:
1. Problema
2. Usuarios
3. Objetivo y métrica de éxito
4. Alcance del MVP (máximo 4 puntos)
5. No-alcance
6. Reglas de negocio
7. Supuestos, marcados con [SUPUESTO]
8. Puntos abiertos
Es un documento de producto: prohibido incluir endpoints, modelos de datos, códigos HTTP o nombres de librerías.
```

Si se coló algo técnico (rutas, campos, MongoDB): *"Reescribe en lenguaje de producto cualquier frase que diga cómo se construye."* Luego:

```text
!git add docs/
/commit
```

> ✅ `docs/prd/invernadero-mvp.md` tiene las 8 secciones y ningún detalle técnico. Las decisiones del cliente están en "Reglas de negocio". Hay un commit nuevo.

### Paso 3 · Épicas e historias de E1 (min 25–33)

**3a. Épicas.** En modo normal:

```text
Lee docs/prd/invernadero-mvp.md y agrupa su alcance en exactamente estas dos épicas:
- E1 · Plantas y riegos: registrar y consultar las plantas y sus riegos.
- E2 · Cuidado: saber qué plantas necesitan agua y manejar el reposo.
Para cada épica escribe: su objetivo en una frase, qué puntos del alcance del PRD cubre y qué reglas de negocio le aplican.
Al final, indica si algún punto del alcance quedó fuera de ambas épicas.
Guárdalo en docs/backlog/epicas.md.
```

Revisa que ningún punto del alcance quede fuera y que no se haya colado nada del no-alcance.

**3b. Historias de E1:**

```text
Descompón la épica E1 en historias de usuario con id HU-1.x y el formato "Como <rol>, quiero <acción>, para <beneficio>".
Aplica INVEST: pequeñas, independientes y comprobables. Todavía no escribas criterios de aceptación.
Valida cada historia contra el alcance del PRD: si alguna se sale del MVP, márcala como "fuera de alcance" en lugar de quitarla en silencio.
Guárdalas en docs/backlog/E1-plantas-y-riegos.md.
```

Deberías obtener algo parecido a: registrar una planta, consultar las plantas, registrar un riego y ver el historial de riegos de una planta. Tus ids pueden ser distintos a los de tus compañeros: es normal.

```text
!git add docs/
/commit
```

> ✅ Existen `docs/backlog/epicas.md` con E1 y E2, y `docs/backlog/E1-plantas-y-riegos.md` con las historias de E1, todavía sin criterios.

### Paso 4 · Criterios y tickets del sprint (min 33–43)

**4a. Criterios de aceptación:**

```text
Para el sprint de hoy tomamos solo dos historias de E1: la de registrar una planta y la de registrar un riego.
Para cada una, escribe criterios de aceptación como reglas de negocio observables, con el formato DADO / CUANDO / ENTONCES, e incluye las reglas del PRD que les aplican.
Después propón casos borde que los criterios todavía no cubren.
Sin endpoints, códigos HTTP ni nombres de campos: solo lo que un cuidador puede comprobar.
```

El docente, como cliente, resolverá los casos borde. Cuando anuncie las decisiones, pega:

```text
Decisiones del cliente sobre los casos borde:
- No se puede registrar un riego de una planta que no existe.
- La cantidad de agua de un riego debe ser mayor que 0.
- Nombre, especie, ubicación e intervalo son obligatorios al registrar una planta.
Agrega estos criterios a las dos historias y guárdalas en docs/backlog/E1-plantas-y-riegos.md. Las demás historias quedan como "por refinar".
```

**4b. Tickets:**

```text
Descompón las dos historias del sprint en tickets de trabajo, máximo 4 por historia. Para cada ticket:
- id (T-01, T-02…), historia a la que pertenece y tipo: Configuración, Modelo/Dominio, Endpoint/API o Test;
- descripción de una o dos líneas: qué capa toca y qué debe lograr, sin diseñarla todavía;
- Definition of Done como checklist ([ ]);
- dependencias: qué tickets deben estar terminados antes.
Termina con el orden de ejecución sugerido. Agrégalo a docs/backlog/E1-plantas-y-riegos.md.
```

Revisa que los tickets digan qué capa tocan **sin** decidir rutas ni esquemas, que cada DoD se pueda comprobar, que haya tickets de Test y que el riego dependa de la planta.

```text
!git add docs/
/commit
```

> ✅ Las dos historias del sprint tienen criterios DADO/CUANDO/ENTONCES (sin detalle técnico) y sus tickets con tipo, DoD y dependencias. Las demás historias dicen "por refinar".

### Paso 5 · Spec 01: plantas y riegos (min 43–50)

Ahora sí entra la técnica:

```text
Escribe docs/specs/01-plantas-y-riegos.md, la spec técnica de las dos historias del sprint, a partir de docs/backlog/E1-plantas-y-riegos.md. Debe incluir:
1. Modelos:
   - Planta: nombre, especie, ubicacion, intervaloRiegoDias, enReposo (por defecto false), cuidadosEspeciales[] embebidos (tipo, nota) y createdAt.
   - Riego: planta (referencia a Planta), fecha (por defecto, ahora), cantidadMl, cuidador.
2. Endpoints: POST y GET /api/plantas, POST /api/riegos y GET /api/plantas/:id/riegos. Para cada uno: cuerpo, respuesta y errores (400 y 404).
3. Los criterios de aceptación de las dos historias, con su id, reescritos con DEBE y NO DEBE.
4. Una tabla criterio → verificación: test automático de validación del modelo (sin base de datos) o prueba manual con curl.
5. Una tabla ticket → archivos que crea o modifica.
Todavía no escribas código.
```

Revisa que todos los criterios del backlog estén en la spec y que cada ticket tenga sus archivos.

```text
!git add docs/
/commit
```

> ✅ Existe `docs/specs/01-plantas-y-riegos.md` con modelos, endpoints, criterios DEBE/NO DEBE, tabla de verificación y tabla ticket → archivos. Todavía no hay código.

### Paso 6 · Hook de formato (min 50–54)

Escribe `/hooks` y comprueba que no hay ninguno. Luego pega:

```text
Prepara el proyecto Node y crea un hook que formatee con Prettier cada archivo que crees o edites:
1. Crea package.json con npm init -y (CommonJS) e instala prettier como dependencia de desarrollo.
2. Crea .claude/hooks/formatear.js: lee de stdin el JSON que envía Claude Code, toma tool_input.file_path y, solo si el archivo es .js o .json, lo formatea con la API de Prettier del proyecto (resolveConfig y format). Si algo falla, termina sin bloquear.
3. En .claude/settings.json, agrega un hook PostToolUse con matcher "Edit|Write" que ejecute: node "$CLAUDE_PROJECT_DIR/.claude/hooks/formatear.js"
No crees ningún otro archivo.
```

Revisa los archivos con `!cat` y compáralos con la "Referencia". Escribe `/hooks`: debe aparecer bajo `PostToolUse`. **Pruébalo:**

```text
Crea demo-hook.js con esta línea exactamente igual, sin corregir nada:
const saludo='hola'   ;console.log( saludo )
```

Con `!cat demo-hook.js` debes ver dos líneas: `const saludo = "hola";` y `console.log(saludo);`. El hook lo corrigió solo. Borra la demo y guarda:

```text
!rm demo-hook.js
!git add .
/commit
```

> ✅ Existen `package.json` (con prettier), `.claude/settings.json` y `.claude/hooks/formatear.js`. `/hooks` muestra el hook y la demo se formateó sola.

### Paso 7 · Código por tickets y validación (min 54–69)

**7a. Plan e implementación.** Activa **plan mode**:

```text
Lee docs/specs/01-plantas-y-riegos.md y docs/backlog/E1-plantas-y-riegos.md y prepara un plan de implementación que siga el orden de los tickets. En cada ticket: primero sus tests (si aplica), después el código.
Incluye: instalar express, mongoose y dotenv; los scripts "dev" (node --watch src/index.js) y "test" (node --test) en package.json; y un .env.example con MONGODB_URI= vacío y PORT=3000.
Indica qué ticket cubre cada paso. Al terminar, ejecuta npm test.
```

Lee el plan: cada paso debe nombrar su ticket. Si está bien, apruébalo. Te recomendamos aprobar cada edición a mano para ver qué se escribe. Espera a que `npm test` pase.

**7b. Conectar la base.** **Fuera de Claude Code**, en tu editor: copia `.env.example` como `.env` y escribe tu cadena de Atlas después de `MONGODB_URI=`. Nunca la pegues en el chat. Luego, en una **segunda terminal** dentro de la carpeta del proyecto:

```bash
npm run dev
```

Déjala abierta: el servidor se reinicia solo cuando cambia el código.

**7c. Validar con curl.** De vuelta en Claude Code:

```text
El servidor está corriendo en http://localhost:3000. Valida la spec 01 con curl, criterio por criterio:
- registra una planta válida y otra con intervaloRiegoDias 0 (debe fallar); lista las plantas;
- registra un riego válido, uno con fecha futura (debe fallar), uno con cantidad 0 (debe fallar) y uno para una planta que no existe (debe dar 404);
- consulta los riegos de la planta válida.
Muestra una tabla: criterio, comando, resultado esperado y resultado obtenido. No modifiques código: si algo falla, solo repórtalo.
```

Si alguna fila falla:

```text
Corrige solo lo necesario para cumplir el criterio [número o texto del criterio] de la spec 01 y vuelve a ejecutar npm test.
```

Antes de guardar, comprueba que `.env` **no** aparezca en `!git status`:

```text
!git status
!git add .
/commit
```

> ✅ Existen `src/` (app, modelos y rutas), `test/` y `.env.example`. `npm test` pasa, la tabla de validación con curl está completa y `.env` no está en el commit.

### Paso 8 · Auditoría y cierre de tickets (min 69–75)

```text
Audita el proyecto contra docs/specs/01-plantas-y-riegos.md. Ejecuta npm test.
1. Escribe docs/AUDITORIA.md con una tabla: criterio, cómo se verificó (test o curl), resultado (cumple / no cumple / sin verificar) y evidencia.
2. En docs/backlog/E1-plantas-y-riegos.md, marca con [x] cada punto del Definition of Done que esté cumplido y agrega a cada ticket su estado: hecho o pendiente.
No corrijas código; solo reporta.
```

```text
!git add docs/
/commit
```

> ✅ Existe `docs/AUDITORIA.md` con una fila por criterio, y cada ticket del backlog dice si está hecho o pendiente. Una fila "sin verificar" no es un fracaso: es información.

### Paso 9 · Push al repositorio remoto (min 75–80)

1. En github.com/new crea un repositorio **vacío** llamado `invernadero-encantado`: sin README, sin .gitignore y sin licencia.
2. En tu terminal (fuera de Claude Code, por si GitHub te pide iniciar sesión), dentro de la carpeta del proyecto:

```bash
git ls-files               # .env NO debe aparecer; .env.example sí
git remote add origin https://github.com/<tu-usuario>/invernadero-encantado.git
git push -u origin main
git log --oneline
```

> ✅ Tu repositorio está en GitHub, sin `.env`. En `git log` se ve el embudo completo en orden: harness → mini-PRD → épicas e historias → criterios y tickets → spec → hook → código → auditoría.

## Referencia: skill de commit y hook de formato

Si lo que generó Claude no funciona, o te perdiste el paso 1b o el 4, crea estos archivos con este contenido.

### Skill: `.claude/skills/commit/SKILL.md`

Una **skill** es una carpeta con un `SKILL.md` que describe un procedimiento. Las de proyecto viven en `.claude/skills/<nombre>/` y viajan con el repo.

```markdown
---
name: commit
description: Crea un commit en formato Conventional Commits con los cambios que están en staging. Úsala cuando el usuario quiera guardar su trabajo en git.
disable-model-invocation: true
---
# Commit

1. Ejecuta `git diff --staged` y lee los cambios.
2. Si no hay nada en staging, avisa y detente. Nunca hagas `git add` por tu cuenta.
3. Si los cambios incluyen `.env` o algo que parezca una credencial, detente y avisa.
4. Escribe el mensaje en formato `tipo(ámbito): resumen`, en español y con máximo 72 caracteres.
   Tipos: feat, fix, docs, test, refactor, chore.
5. Muestra el mensaje y haz el commit. Nunca hagas push.
```

- **`description`** es lo único que el agente ve de la skill hasta que se invoca.
- **`disable-model-invocation: true`** hace que solo tú puedas ejecutarla, escribiendo `/commit`.
- **Cómo se usa:** primero `!git add <archivos>` y después `/commit`. La skill no hace `git add` por su cuenta.

### Hook: `.claude/settings.json` y `.claude/hooks/formatear.js`

Un **hook** es un comando que Claude Code ejecuta automáticamente en un momento fijo, por ejemplo después de editar un archivo. No depende de que el modelo decida hacerlo. Necesita Prettier instalado: `npm install -D prettier`.

`.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/formatear.js\""
          }
        ]
      }
    ]
  }
}
```

`.claude/hooks/formatear.js`:

```js
// Claude Code envía por stdin un JSON con la herramienta usada y sus parámetros.
const fs = require("node:fs");
const prettier = require("prettier");

let entrada = "";
process.stdin.on("data", (trozo) => (entrada += trozo));
process.stdin.on("end", async () => {
  try {
    const archivo = JSON.parse(entrada).tool_input?.file_path;
    if (!archivo || !/\.(js|json)$/.test(archivo)) return;
    const codigo = fs.readFileSync(archivo, "utf8");
    const opciones = (await prettier.resolveConfig(archivo)) ?? {};
    const formateado = await prettier.format(codigo, { ...opciones, filepath: archivo });
    if (formateado !== codigo) fs.writeFileSync(archivo, formateado);
  } catch {
    // Si algo falla, no bloqueamos el trabajo del agente.
  }
});
```

| Parte | Para qué sirve |
| --- | --- |
| `PostToolUse` | Corre justo después de que Claude usa una herramienta |
| `matcher: "Edit\|Write"` | Solo cuando Claude edita o crea un archivo |
| `command` | Recibe por stdin un JSON con la ruta en `tool_input.file_path` |
| `$CLAUDE_PROJECT_DIR` | La raíz del proyecto, para que funcione en cualquier máquina |

Comprueba con `/hooks` que aparece bajo `PostToolUse`. Si tu `package.json` dice `"type": "module"`, renombra el script a `formatear.cjs` y ajusta la ruta en `settings.json`.

## Cómo retomar si te perdiste

Cada paso lee los archivos del paso anterior, no la conversación. Por eso puedes retomar desde cualquier punto, incluso en una sesión nueva de Claude Code, siempre que tengas esos archivos. Si el contexto se llena, usa `/compact` o `/clear`: lo que está en `docs/` no se pierde.

### 1. Ubícate

```text
!git status
!git log --oneline
```

Busca en esta tabla el primer archivo que te falte y empieza en ese paso.

| Para empezar el paso… | Necesitas tener | Si te falta |
| --- | --- | --- |
| 1 · Harness | Carpeta con `git init` | Paso 0 |
| 2 · Mini-PRD | `AGENTS.md`, `CLAUDE.md`, `/commit` | Prompt 1a; la skill, desde la Referencia (o rescate `paso-1`) |
| 3 · Épicas e historias | `docs/prd/invernadero-mvp.md` | Prompts 2a, decisiones del cliente y 2b (o rescate `paso-2`) |
| 4 · Criterios y tickets | `docs/backlog/epicas.md` y las historias de E1 | Prompts 3a y 3b (o rescate `paso-3`) |
| 5 · Spec 01 | Criterios y tickets de las 2 historias del sprint | Prompts 4a, decisiones y 4b (o rescate `paso-4`) |
| 6 · Hook | `docs/specs/01-plantas-y-riegos.md` | Prompt del paso 5 (o rescate `paso-5`) |
| 7 · Código | `package.json` con prettier y el hook | Prompt del paso 6 o la Referencia (o rescate `paso-6`) |
| 8 · Auditoría | `src/`, `test/` y `npm test` pasando | Prompt 7a (o rescate `paso-7`) |

**Una sesión nueva y el paso 2a.** Es el único paso que vive en la conversación. Si lo perdiste, repite el prompt 2a y el de las decisiones del cliente, y sigue con 2b.

### 2. Si la IA se fue por otro lado

- **Detenerla:** `Esc`.
- **Volver a un punto anterior** de la conversación y del código: `Esc` dos veces o `/rewind`.
- **Descartar cambios** en un archivo que ya estaba en un commit: `!git restore <archivo>`. Para borrar un archivo nuevo que no quieres: `!rm <archivo>`.
- **Empezó a programar antes de tener spec:** deténla, descarta los cambios y recuérdale la regla de AGENTS.md.

### 3. Repositorio de rescate del docente

El docente publica su propia solución con una etiqueta por paso (`paso-1` a `paso-8`). Puedes traer **solo el archivo que te falta**, sin tocar el resto de tu trabajo:

```bash
git remote add docente https://github.com/aparrauio/invernadero-encantado-solucion.git
git fetch docente --tags
git checkout paso-5 -- docs/specs/01-plantas-y-riegos.md
```

Cambia la etiqueta y la ruta por las que necesites. Por ejemplo, `paso-2 -- docs/prd/invernadero-mvp.md` o `paso-6 -- .claude/`. Después haz commit con `!git add` y `/commit` y sigue desde el paso siguiente.

Antes del push final, comprueba con `git remote -v` que `origin` apunte a **tu** repositorio y no al del docente.

## Comandos útiles y problemas frecuentes

### Comandos de Claude Code

| Comando | Qué hace |
| --- | --- |
| `Shift+Tab` | Cambia de modo: normal → aceptar ediciones → plan mode |
| `/context` | Muestra cuánto contexto está ocupado |
| `/compact` | Resume la conversación para liberar contexto |
| `/clear` | Empieza una conversación nueva |
| `/hooks` | Lista los hooks configurados |
| `/commit` | Tu skill: hace commit de lo que está en staging |
| `Esc` | Detiene a la IA |
| `Esc Esc` o `/rewind` | Vuelve a un punto anterior de la conversación y del código |
| `!<comando>` | Ejecuta un comando de shell sin pasar por la IA |
| `/exit` | Sale de Claude Code |

### Comandos del proyecto

| Comando | Qué hace |
| --- | --- |
| `npm test` | Ejecuta los tests |
| `npm run dev` | Levanta la API en http://localhost:3000 y la reinicia con cada cambio |
| `git log --oneline` | Muestra la historia de commits |

### Problemas frecuentes

| Síntoma | Qué hacer |
| --- | --- |
| La IA creó archivos en el paso 2a | No estabas en plan mode. `!git status`, borra lo nuevo, activa plan mode y repite |
| "No puedo crear archivos en plan mode" | Sal de plan mode con `Shift+Tab` y repite |
| El mini-PRD o los criterios traen rutas, campos o MongoDB | "Reescribe en lenguaje de producto cualquier frase que diga cómo se construye" |
| La IA propone otras épicas o una tercera | Pega de nuevo el prompt 3a: son exactamente dos |
| Salieron 7 historias o más en E1 | "Quédate con las 4 historias más cercanas al alcance de E1; marca el resto como fuera de alcance" |
| Los tickets deciden rutas o esquemas | "Deja en cada ticket solo la capa y el objetivo; el diseño va en la spec" |
| Tus ids de historia no coinciden con los de tus compañeros | Es normal: los prompts nombran las historias por lo que hacen |
| La IA empieza a programar entre los pasos 3 y 5 | `Esc`, descarta los cambios y recuérdale: "Todavía no escribas código" |
| `/commit` no aparece al escribir `/` | Revisa la ruta `.claude/skills/commit/SKILL.md` y que el frontmatter abra y cierre con `---`; luego `/exit` y `claude` |
| `/commit` dice que no hay nada en staging | Es correcto: primero `!git add <archivos>` |
| El hook no aparece en `/hooks` | Revisa comas y llaves de `settings.json`; luego `/exit` y `claude` |
| La demo del hook no se formateó | Comprueba `npm install -D prettier`; para ver el error, `/debug` |
| La IA pide leer `.env` | Rechaza el permiso: AGENTS.md lo prohíbe |
| `npm run dev` no conecta a MongoDB | Revisa tu `.env` en el editor y tu IP en Atlas. Mientras tanto sigue con `npm test`. No abras Atlas a `0.0.0.0/0` ni pegues tu cadena en el chat |
| `EADDRINUSE` al iniciar | El puerto 3000 está ocupado: cambia `PORT` en `.env` y díselo a Claude |
| Una fila de la validación con curl falla | "Corrige solo lo necesario para cumplir el criterio \[…\] de la spec 01 y vuelve a ejecutar npm test" |
| `git push` pide usuario o se queda esperando | Hazlo en tu terminal, fuera de Claude Code. Si no tienes acceso, entrégalo en la siguiente sesión |
