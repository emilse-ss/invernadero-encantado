function validarFecha(fecha, ahora = new Date()) {
  const valor = fecha ?? ahora;
  const fechaValor = valor instanceof Date ? valor : new Date(valor);
  if (Number.isNaN(fechaValor.getTime()) || fechaValor > ahora) {
    throw new Error("La fecha debe ser válida y no futura");
  }
  return fechaValor;
}

function validarRiego(datos, ahora = new Date()) {
  if (!datos.planta) throw new Error("La planta es obligatoria");
  if (typeof datos.cantidadMl !== "number" || datos.cantidadMl <= 0) {
    throw new Error("cantidadMl debe ser mayor que 0");
  }
  if (typeof datos.cuidador !== "string" || !datos.cuidador.trim()) {
    throw new Error("El cuidador es obligatorio");
  }
  return {
    planta: datos.planta,
    fecha: validarFecha(datos.fecha, ahora),
    cantidadMl: datos.cantidadMl,
    cuidador: datos.cuidador.trim(),
  };
}

function riegoMasReciente(riegos) {
  return [...riegos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
}

module.exports = { validarRiego, riegoMasReciente };
