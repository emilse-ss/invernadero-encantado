const express = require("express");
const mongoose = require("mongoose");
const { validarPlanta } = require("../dominio/plantas");

function crearRouterPlantas(store) {
  const router = express.Router();

  router.post("/api/plantas", (req, res) => {
    try {
      const planta = validarPlanta(req.body ?? {});
      const creada = {
        _id: new mongoose.Types.ObjectId().toString(),
        ...planta,
        createdAt: new Date(),
      };
      store.plantas.push(creada);
      res.status(201).json(creada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/api/plantas", (_req, res) => {
    res.json(store.plantas);
  });

  return router;
}

module.exports = crearRouterPlantas;
