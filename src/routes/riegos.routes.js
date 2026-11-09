const express = require("express");
const mongoose = require("mongoose");
const { validarRiego, riegoMasReciente } = require("../dominio/riegos");

function crearRouterRiegos(store) {
  const router = express.Router();

  router.post("/api/riegos", (req, res) => {
    try {
      const datos = validarRiego(req.body ?? {}, new Date());
      const existe = store.plantas.some(
        (planta) => planta._id === datos.planta,
      );
      if (!existe)
        return res.status(404).json({ error: "La planta no existe" });

      const riego = { _id: new mongoose.Types.ObjectId().toString(), ...datos };
      store.riegos.push(riego);
      res.status(201).json(riego);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/api/plantas/:id/riegos", (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ error: "Identificador de planta inválido" });
    }
    const existe = store.plantas.some((planta) => planta._id === req.params.id);
    if (!existe) return res.status(404).json({ error: "La planta no existe" });

    const riegos = store.riegos
      .filter((riego) => riego.planta === req.params.id)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    res.json(riegos);
  });

  return router;
}

module.exports = crearRouterRiegos;
