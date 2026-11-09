const test = require("node:test");
const assert = require("node:assert/strict");
const createApp = require("../../src/app");

async function pedir(server, ruta, opciones) {
  const address = server.address();
  const respuesta = await fetch(
    `http://127.0.0.1:${address.port}${ruta}`,
    opciones,
  );
  return { status: respuesta.status, body: await respuesta.json() };
}

test("POST y GET de riegos", async () => {
  const app = createApp();
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const planta = await pedir(server, "/api/plantas", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nombre: "Rosa",
        especie: "Rosa",
        ubicacion: "Sur",
        intervaloRiegoDias: 2,
      }),
    });
    const riego = await pedir(server, "/api/riegos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        planta: planta.body._id,
        cantidadMl: 100,
        cuidador: "Ana",
      }),
    });
    assert.equal(riego.status, 201);
    const listado = await pedir(
      server,
      `/api/plantas/${planta.body._id}/riegos`,
    );
    assert.equal(listado.status, 200);
    assert.equal(listado.body.length, 1);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});

test("rechaza planta inexistente, cantidad inválida y fecha futura", async () => {
  const app = createApp();
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const inexistente = await pedir(server, "/api/riegos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        planta: "507f1f77bcf86cd799439011",
        cantidadMl: 100,
        cuidador: "Ana",
      }),
    });
    assert.equal(inexistente.status, 404);

    const planta = await pedir(server, "/api/plantas", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nombre: "Orquídea",
        especie: "Orchidaceae",
        ubicacion: "Este",
        intervaloRiegoDias: 4,
      }),
    });
    const invalido = await pedir(server, "/api/riegos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        planta: planta.body._id,
        cantidadMl: 0,
        cuidador: "Ana",
      }),
    });
    assert.equal(invalido.status, 400);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
