function validarTexto(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function validarPlanta(datos) {
  for (const campo of [
    "nombre",
    "especie",
    "ubicacion",
    "intervaloRiegoDias",
  ]) {
    if (
      datos[campo] === undefined ||
      datos[campo] === null ||
      datos[campo] === ""
    ) {
      throw new Error(`${campo} es obligatorio`);
    }
  }
  if (
    !validarTexto(datos.nombre) ||
    !validarTexto(datos.especie) ||
    !validarTexto(datos.ubicacion)
  ) {
    throw new Error("Los datos de texto son obligatorios");
  }
  if (
    !Number.isInteger(datos.intervaloRiegoDias) ||
    datos.intervaloRiegoDias < 1
  ) {
    throw new Error(
      "intervaloRiegoDias debe ser un entero mayor o igual que 1",
    );
  }
  return {
    nombre: datos.nombre.trim(),
    especie: datos.especie.trim(),
    ubicacion: datos.ubicacion.trim(),
    intervaloRiegoDias: datos.intervaloRiegoDias,
    enReposo: datos.enReposo ?? false,
    cuidadosEspeciales: datos.cuidadosEspeciales ?? [],
  };
}

module.exports = { validarPlanta };
