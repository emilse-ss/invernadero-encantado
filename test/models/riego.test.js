const test = require("node:test");
const assert = require("node:assert/strict");
const { validarRiego, riegoMasReciente } = require("../../src/dominio/riegos");

const hoy = new Date("2026-10-28T12:00:00.000Z");

test("acepta una planta existente y una fecha pasada", () => {
  const riego = validarRiego(
    {
      planta: "planta-1",
      fecha: new Date("2026-10-27T12:00:00.000Z"),
      cantidadMl: 250,
      cuidador: "Ana",
    },
    hoy,
  );
  assert.equal(riego.cantidadMl, 250);
});

test("rechaza planta inexistente o cantidad no positiva", () => {
  assert.throws(() =>
    validarRiego(
      { planta: null, fecha: hoy, cantidadMl: 250, cuidador: "Ana" },
      hoy,
    ),
  );
  assert.throws(() =>
    validarRiego(
      { planta: "planta-1", fecha: hoy, cantidadMl: 0, cuidador: "Ana" },
      hoy,
    ),
  );
});

test("rechaza fechas futuras", () => {
  assert.throws(() =>
    validarRiego(
      {
        planta: "planta-1",
        fecha: new Date("2026-10-29T12:00:00.000Z"),
        cantidadMl: 250,
        cuidador: "Ana",
      },
      hoy,
    ),
  );
});

test("selecciona el riego más reciente", () => {
  const resultado = riegoMasReciente([
    { fecha: new Date("2026-10-20T12:00:00.000Z") },
    { fecha: new Date("2026-10-27T12:00:00.000Z") },
  ]);
  assert.equal(resultado.fecha.toISOString(), "2026-10-27T12:00:00.000Z");
});
