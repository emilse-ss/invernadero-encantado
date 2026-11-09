const test = require("node:test");
const assert = require("node:assert/strict");
const { validarPlanta } = require("../../src/dominio/plantas");

test("acepta una planta válida y asigna enReposo false", () => {
  const planta = validarPlanta({
    nombre: "Helecho lunar",
    especie: "Polypodiopsida",
    ubicacion: "Invernadero norte",
    intervaloRiegoDias: 3,
  });
  assert.equal(planta.enReposo, false);
});

test("rechaza datos obligatorios ausentes", () => {
  for (const dato of ["nombre", "especie", "ubicacion", "intervaloRiegoDias"]) {
    const planta = {
      nombre: "P",
      especie: "E",
      ubicacion: "U",
      intervaloRiegoDias: 3,
    };
    delete planta[dato];
    assert.throws(() => validarPlanta(planta), /obligatorio/i);
  }
});

test("rechaza intervalos inválidos", () => {
  for (const intervalo of [0, -1, 1.5, "3", undefined]) {
    assert.throws(() =>
      validarPlanta({
        nombre: "P",
        especie: "E",
        ubicacion: "U",
        intervaloRiegoDias: intervalo,
      }),
    );
  }
});
