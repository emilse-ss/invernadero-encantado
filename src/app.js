const express = require("express");
const crearRouterPlantas = require("./routes/plantas.routes");
const crearRouterRiegos = require("./routes/riegos.routes");

function createApp(store = { plantas: [], riegos: [] }) {
  const app = express();
  app.use(express.json());
  app.use(crearRouterPlantas(store));
  app.use(crearRouterRiegos(store));
  app.use((error, _req, res, _next) => {
    res.status(400).json({ error: error.message });
  });
  return app;
}

module.exports = createApp;
