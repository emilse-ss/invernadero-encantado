const test = require("node:test");
const assert = require("node:assert/strict");
const createApp = require("../../src/app");

async function pedir(app, ruta, opciones) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const address = server.address();
    const respuesta = await fetch(
      `http://127.0.0.1:${address.port}${ruta}`,
      opciones,
    );
    return { status: respuesta.status, body: await respuesta.json() };
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

test("POST y GET /api/plantas", async () => {
  const app = createApp();
  const creada = await pedir(app, "/api/plantas", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      nombre: "Helecho",
      especie: "Polypodiopsida",
      ubicacion: "Norte",
      intervaloRiegoDias: 3,
    }),
  });
  assert.equal(creada.status, 201);
  assert.equal(creada.body.enReposo, false);

  const listado = await pedir(app, "/api/plantas");
  assert.equal(listado.status, 200);
  assert.equal(listado.body.length, 1);
});

test("rechaza una planta incompleta", async () => {
  const creada = await pedir(createApp(), "/api/plantas", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      nombre: "Helecho",
      especie: "Polypodiopsida",
      ubicacion: "Norte",
    }),
  });
  assert.equal(creada.status, 400);
});
